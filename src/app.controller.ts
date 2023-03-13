import { CompService } from './comp/comp.service'
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from 'express'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly compService: CompService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('/:url')
    async getRedirectUrl(@Param('url') url: string, @Res() res: Response) {
        const redirectUrl = await this.compService.getRedirectUrl(url)

        if (url) {
            res.redirect(HttpStatus.PERMANENT_REDIRECT, redirectUrl)
        } else {
            res.status(404).send('URL이 존재하지 않습니다.')
        }
    }
}
