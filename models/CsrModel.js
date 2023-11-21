import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const {DataTypes} = Sequelize;

const CSR = db.define('csrupload',{
    judul: DataTypes.STRING,
    desc : DataTypes.STRING,
    img : DataTypes.STRING,
    url : DataTypes.STRING,
},{freezeTableName:true});

export default CSR ;

(async ()=>{
    await db.sync()
})();

