import { IsUrl } from 'class-validator'

export class CompGetRequestDto {
    @IsUrl()
    url: string
}

export class CompGetResponseDto {
    @IsUrl()
    url: string
}
