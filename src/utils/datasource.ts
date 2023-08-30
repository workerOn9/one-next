import { DataSource } from "typeorm"

const PostgresDatasource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

export default PostgresDatasource