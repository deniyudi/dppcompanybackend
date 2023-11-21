import { Sequelize } from "sequelize";

const db = new Sequelize('testdpp','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db;