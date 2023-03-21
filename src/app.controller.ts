import { CompService } from './comp/comp.service'
import { Controller, Get, HttpStatus, Param, Redirect, Render, Res, UseInterceptors } from '@nestjs/common'
import { PageInterceptor } from './common/interceptors'
import { Response } from 'express'

@Controller()
@UseInterceptors(PageInterceptor)
export class AppController {
    constructor(private readonly compService: CompService) {}

    @Get()
    @Render('index')
    root(@Res() res: Response) {
        // return res.redirect('/')
        return { title: 'Home Page' }
    }

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
