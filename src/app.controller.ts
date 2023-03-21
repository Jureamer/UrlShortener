import { join } from 'path'
import { CompService } from './comp/comp.service'
import { Controller, Get, HttpStatus, Param, Render, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('')
export class AppController {
    constructor(private readonly compService: CompService) {}

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' }
    }

    // @Get(':url')
    // async getRedirectUrl(@Param('url') url: string, @Res() res: express.Response) {
    //     const redirectUrl = await this.compService.getRedirectUrl(url)

    //     if (url) {
    //         res.redirect(HttpStatus.PERMANENT_REDIRECT, redirectUrl)
    //     } else {
    //         res.status(404).send('URL이 존재하지 않습니다.')
    //     }
    // }
}
