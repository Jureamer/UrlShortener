import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { LoggerService } from '../common/middlewares/logger.service'
import { EntityManager, EntityRepository } from '@mikro-orm/mysql'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Inject, Injectable } from '@nestjs/common'
import { Url } from './entity/comp.entity'
import axios from 'axios'

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

@Injectable()
export class CompService {
    constructor(
        @InjectRepository(Url)
        private readonly compRepository: EntityRepository<Url>,
    ) {}

    async checkValidation(url: string): Promise<Boolean> {
        // url 유효성 체크
        return await axios
            .get(url)
            .then((_) => {
                console.log(`_ ${_}`)
                return true
            })
            .catch((_) => {
                console.error(`Error: ${_}`)
                return false
            })
    }

    async shortenUrl(longUrl: string) {
        console.log(`longUrl: ${longUrl}`)
        // longUrl 유효성 체크
        const isValidate = await this.checkValidation(longUrl)

        console.log(`isValidate: ${isValidate}`)
        if (!isValidate) {
            return { longUrl: '', shortUrl: '' }
        }

        // 기존에 등록된 URL이면 기존의 shortUrl을 반환
        const result = await this.compRepository.findOne({ longUrl })

        console.log(`이미 등록된 URL입니다.: ${result}`)
        if (result) {
            return result
        }

        // 등록되지 않았다면 새로운 Url 만들어서 반환
        const shortUrl = await this.getNewShortUrl()

        console.log(`shortUrl: ${shortUrl}`)
        const body = new Url(longUrl, shortUrl)
        await this.compRepository.persistAndFlush(body)
        console.log(`body: ${body}`)
        return body
    }

    async getNewShortUrl(): Promise<string> {
        let randomId8 = ''

        while (randomId8.length < 8) {
            const num = Math.round(Math.random() * 61)
            randomId8 += BASE62[num]
        }

        const isExist = await this.compRepository.findOne({ shortUrl: randomId8 })

        if (isExist) {
            randomId8 = await this.getNewShortUrl()
        }
        return randomId8
    }

    async getRedirectUrl(shortUrl: string): Promise<string> {
        console.log(`url: ${shortUrl}`)
        try {
            const result = await this.compRepository.findOneOrFail({ shortUrl })
            return result.longUrl
        } catch (err) {
            return undefined
        }
    }

    async redirectUrl(shortUrl: string): Promise<string[]> {
        const result = await this.compRepository.findOneOrFail({ shortUrl })
        if (result) {
        }
        return []
    }

    async shorten(url: string): Promise<string> {
        return ''
    }
}
