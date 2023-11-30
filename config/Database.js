import { Sequelize } from "sequelize";


// Via Docker adminer 

const db = new Sequelize('dppcompany','root','dpp',{
    host:'db',
    dialect:'mysql'
})

// Via Localhost XAMPP

// const db = new Sequelize('testdpp','root','',{
//     host:'localhost',
//     dialect:'mysql'
// })

export default db;