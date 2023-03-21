import { existsSync } from 'fs'
import { resolve } from 'path'

export function getEnvPath(destination: string): string {
    const env: string | undefined = process.env.NODE_ENV
    const fallback: string = resolve(`${destination}/.env`)
    const filename: string = env ? `${env}.env` : 'development.env'
    let filePath: string = resolve(`${destination}/${filename}`)

    if (!existsSync(filePath)) {
        filePath = fallback
    }

    return filePath
}
