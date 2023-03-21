import { applyDecorators, Render } from '@nestjs/common'

export function View(pageName: string) {
    return applyDecorators(Render(`pages/${pageName}`))
}
