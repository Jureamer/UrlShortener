import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { IsEnum, IsNumber, IsString, IsUrl } from 'class-validator'

@Entity()
export class Url {
    @PrimaryKey()
    id!: number

    @Property()
    @IsUrl()
    longUrl: string

    @Property()
    @IsUrl()
    shortUrl: string

    @Property({ default: 'Y' })
    @IsEnum(['Y', 'N'])
    useYN: string

    @Property({ type: 'timestamp' })
    createdAt: String = new Date().toISOString().slice(0, 19).replace('T', ' ')

    @Property({ type: 'timestamp', onUpdate: () => new Date().toISOString().slice(0, 19).replace('T', ' ') })
    updatedAt: String = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // 만료일자 구하기 1주일
    @Property({ type: 'timestamp' })
    expirationAt: String

    constructor(longUrl: string, shortUrl: string) {
        let date = new Date()
        date.setDate(date.getDate() + 30)
        const newDate = date.toISOString().slice(0, 19).replace('T', ' ')

        this.shortUrl = shortUrl
        this.longUrl = longUrl
        this.expirationAt = newDate
    }
}

export class Statistic {
    @PrimaryKey()
    id!: number

    @IsNumber()
    urlId!: number

    @Property()
    @IsString()
    ipAddress: string

    @Property()
    @IsString()
    region: string

    @Property()
    @IsString()
    country: string

    @Property({ type: 'timestamp' })
    @IsString()
    accessDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ')

    constructor(urlId: number, ipAddress: string, region: string, country: string) {
        this.urlId = urlId
        this.ipAddress = ipAddress
        this.region = region
        this.country = country
    }
}
