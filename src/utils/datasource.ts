import { DataSource } from "typeorm"

const PostgresDatasource = new DataSource({
    type: "postgres",
    host: "",
    port: 80,
    username: "",
    password: "",
    database: ""
})

export default PostgresDatasource