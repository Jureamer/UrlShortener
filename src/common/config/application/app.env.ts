import * as path from 'path'

export const SERVER_PORT = process.env.SERVER_PORT
export const SERVER_HOST = process.env.SERVER_HOST
export const SERVER_API = `https://${SERVER_HOST}:${SERVER_PORT}`
export const WORKING_DIR = path.resolve(__dirname, '../../../../../')
export const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET
