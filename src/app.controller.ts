import { CompService } from './comp/comp.service'
import { Controller, Get, HttpStatus, Param, Redirect, Render, Res, UseInterceptors } from '@nestjs/common'
import { Response } from 'express'

@Controller()
export class AppController {
    constructor(private readonly compService: CompService) {}

    @Get()
    @Render('index')
    root() {
        return { title: 'Home Page' }
    }

    @Get('/:url')
    async getRedirectUrl(@Param('url') url: string, @Res() res: Response) {
        if (url) {
            res.redirect(HttpStatus.PERMANENT_REDIRECT, await this.compService.getRedirectUrl(url))
        } else {
            res.status(404).send('URL이 존재하지 않습니다.')
        }
    }
}
