module.exports = {
  driver: 'clickhouse',
  host: process.env.CH_HOST ?? 'localhost',
  username: process.env.CH_USERNAME ?? 'default',
  password: process.env.CH_PASSWORD ?? '',
  database: process.env.CH_DATABASE ?? 'default',
  port: process.env.CH_PORT ?? 8123,
}