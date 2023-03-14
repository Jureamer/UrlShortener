import { CompService } from './comp/comp.service'
import { Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('')
export class AppController {
    constructor(private readonly compService: CompService) {}

    @Get(':url')
    async getRedirectUrl(@Param('url') url: string, @Res() res: Response) {
        const redirectUrl = await this.compService.getRedirectUrl(url)

        if (url) {
            res.redirect(HttpStatus.PERMANENT_REDIRECT, redirectUrl)
        } else {
            res.status(404).send('URL이 존재하지 않습니다.')
        }
    }
}
