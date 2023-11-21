import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const {DataTypes} = Sequelize;

const Berita = db.define('upload',{
    judul: DataTypes.STRING,
    desc : DataTypes.STRING,
    category : DataTypes.STRING,
    img : DataTypes.STRING,
    url : DataTypes.STRING,
},{freezeTableName:true});

export default Berita;

(async ()=>{
    await db.sync()
})();

