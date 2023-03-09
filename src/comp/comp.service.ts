import { EntityManager, EntityRepository } from '@mikro-orm/mysql'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { Url } from './entity/comp.entity'

@Injectable()
export class CompService {
    constructor(
        @InjectRepository(Url)
        private readonly compRepository: EntityRepository<Url>,
    ) {}

    async shortenUrl(url: string): Promise<Url> {
        // 기존에 등록된 URL이면 기존의 shortUrl을 반환
        const result = await this.compRepository.findOneOrFail({ longUrl: url })

        if (result) {
            return result
        }

        // 등록되지 않았다면 새로운 shortUrl을 생성하여 반환
        const shortUrl = `http://localhost:3000/`
        return 'http://www.naver.com'
    }

    async getShortUrl(url: string): Promise<string[]> {
        const result = await this.compRepository.findOneOrFail({ longUrl: url })
        return []
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
