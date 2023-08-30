# Good Morning🌞

## 参数说明

> 需要预先在项目更目录下创建`.env`并填充以下部份参数

### 原生PG

* NATIVE_PG_URL

e.g. `postgres://username:passowrd@host:port/database`

### typeorm

* PG_HOST
* PG_PORT
* PG_PORT
* PG_USERNAME
* PG_PASSWORD
* PG_DATABASE

### prisma

* DATABASE_URL

## API

* `/api/pgclient`
* `/api/ormclient`
* `/api/prismaclient`

请求体格式，例子如下:

```json
{
    "sql": "select current_date"
}
```