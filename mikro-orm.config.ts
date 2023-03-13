import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

export default {
    seeder: {
        path: '../db',
    },
    entities: ['src/**/entity/*.entity.{ts,js}'], // no need for `entitiesTs` this way
    dbName: 'url',
    user: 'root',
    host: '127.0.0.1',
    password: 'gksals49',
    type: 'mysql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    debug: true,
    highlighter: new SqlHighlighter(),
    baseDir: __dirname,
}
