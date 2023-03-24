import { Options } from '@mikro-orm/mysql'

const mikroOrmConfig: Options = {
    type: 'mysql',
    dbName: process.env.DATABASE_NAME,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/src/**/entity/*.js'],
    entitiesTs: ['src/**/entity/*.ts'],
}

export default mikroOrmConfig
