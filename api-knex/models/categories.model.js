
const db = require('../connection')
const table_name = 'categories'
class Categories {
    async getAll() {
        let data = {}
        data.categories = await db.select("*").table(table_name)

        

        return data
    }
    async report(columns) {
        let data = {}
        let query = "";
                
        if (columns.category_title) {
            query += ` AND category_title = '${columns.category_title}'`
        }
            
        data.categories = await db.raw(`SELECT * FROM ${table_name} WHERE 1=1 ${query}`).then(data => {
            return data[0]
        })
        
        return data
    }
    async getById(id) {
        let data = {}
        data.categories =  await db.select("*").table(table_name).where('category_id', id).first()
        data.facts = await db.select("*").table('facts').where('category_id', id)
        return data
    }
    async getByColumn(column, value) {
        let data = {}
        data.categories = await db.select("*").table(table_name).where(column, value)
        
        return data
    }
    async createList(data) {
        const insert = await db(table_name).insert(data)
        return insert
    }
    async createOne(data) {
        const insert = await db(table_name).insert(data)
        const insertedData = await db.select("*").table(table_name).where('category_id', insert[0])
            .then(data => {
                return data
            })
        return insertedData[0]
    }
    async updateByID(data, id) {
        const update = await db(table_name)
            .where('category_id', id)
            .update(data).then(async () => {
                return await db.select("*").table(table_name).where('category_id', id)
            })

            return update[0] ? update[0] : null
            
    }
    async deleteByID(id) {
        const deletedData = await db(table_name).where('category_id', id).del().then(data => {
            return data
        });
        return deletedData
    }
    async updateByColumn(data, column, value) {
        const updatedData = await db(table_name).where(column, value).update(data)
        .then(async (_) => {
            return await db.select("*").table(table_name).where(column, value)
        })
        return updatedData
    }
    async deleteList(list) {
        const deletedData = await db(table_name).whereIn('category_id', list).del().then(data => {
            return data
        });
        return deletedData
    }
}
module.exports = new Categories()
        