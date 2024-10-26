     
const db = require('../connection')
class Config {

    async updateImage(table_name, column_name, table_key , table_key_value, file_name) {
        return await db(table_name).where(table_key, table_key_value).update(column_name, file_name)
        .then(async data => {
            return await db(table_name).where(table_key, table_key_value).first()
            }).catch(err => {
            return err
        })
    }
   
}
module.exports = new Config()
        