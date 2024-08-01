module.exports = {
    driver: 'pg',
    host: process.env.PG_HOST ?? 'localhost',
    username: process.env.PG_USERNAME ?? 'postgres',
    password: process.env.PG_PASSWORD ?? '',
    database: process.env.PG_DATABASE ?? '',
    port: process.env.PG_PORT ?? 5432,
}