import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

export default {
    seeder: {
        path: '../db',
    },
    entities: ['src/**/entity/*.entity.{ts,js}'], // no need for `entitiesTs` this way
    dbName: process.env.DATABASE_NAME || 'url',
    user: process.env.DATABASE_USER || 'root',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    password: process.env.DATABASE_PASSWORD || 'gksals49',
    type: process.env.DATABASE_TYPE || 'mysql',
    debug: true,
    highlighter: new SqlHighlighter(),
    baseDir: __dirname,
} as MikroOrmModuleSyncOptions
