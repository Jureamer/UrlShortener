import { EntityRepository } from '@mikro-orm/mysql'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { Url } from './entity/comp.entity'
import axios from 'axios'
import { getOneMonthAfterBasedCurrentDate, getRandomId } from 'src/common/util'

@Injectable()
export class CompService {
    constructor(
        @InjectRepository(Url)
        private readonly compRepository: EntityRepository<Url>,
    ) {}

    async checkValidation(url: string): Promise<Boolean> {
        return await axios
            .get(url)
            .then((_) => {
                return true
            })
            .catch((_) => {
                return false
            })
    }

    attachServerUrl(url: string): string {
        return 'localhost:3000/' + url
    }

    async shortenUrl(longUrl: string) {
        // longUrl 유효성 체크
        const isValidate = await this.checkValidation(longUrl)

        if (!isValidate) {
            return null
        }

        // 기존에 등록된 URL이면 기존의 shortUrl을 반환
        const result = await this.compRepository.findOne({ longUrl })

        if (result) {
            result.shortUrl = this.attachServerUrl(result.shortUrl)
            return result
        }

        // 등록되지 않았다면 새로운 Url 만들어서 반환
        const shortUrl = await this.getNewShortUrl()

        const body = new Url(longUrl, shortUrl)
        await this.compRepository.persistAndFlush(body)
        body.shortUrl = this.attachServerUrl(body.shortUrl)
        return body
    }

    async getNewShortUrl(): Promise<string> {
        let randomId7 = getRandomId(7)
        const isExist = await this.compRepository.findOne({ shortUrl: randomId7 })

        if (isExist) {
            randomId7 = getRandomId(7)
        }
        return randomId7
    }

    async getRedirectUrl(shortUrl: string): Promise<string> {
        try {
            const result = await this.compRepository.findOneOrFail({ shortUrl })
            // 조회 할 경우 한달 뒤로 업데이트
            console.log(`현재 기준  한달 뒤: ${getOneMonthAfterBasedCurrentDate()}`)
            await this.compRepository.nativeUpdate(
                { id: result.id },
                { expirationAt: getOneMonthAfterBasedCurrentDate() },
            )
            return result.longUrl
        } catch (err) {
            return undefined
        }
    }
}
