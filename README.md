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

## 聊天

> 需要预先在项目更目录下创建`.env`并填充以下部份参数

### AzureOpenAI

* AZURE_ENDPOINT
* AZURE_OPENAI_KEY
* AZURE_OPENAI_MODEL: 本人使用`gpt35`和`gpt4`，服务端和客户端相同，如果你的不同特别需要在客户端也就是页面代码上修改映射

## SQL-AST

```bash
npm i node-sql-parser
```

* `/api/sqlparse`
