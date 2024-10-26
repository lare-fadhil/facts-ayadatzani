
const db = require('../connection')
const table_name = 'facts'
class Facts {
    async getAll() {
        let data = {}
        data.facts = await db.select("*").table('facts_view').orderByRaw('RAND()');

        
        data.categories = await db.select("*").table('categories')

        return data
    }
    async report(columns) {
        let data = {}
        let query = "";
                
        if (columns.fact_text) {
            query += ` AND fact_text = '${columns.fact_text}'`
        }
            
        if (columns.category_id) {
            query += ` AND category_id = '${columns.category_id}'`
        }
            
        if (columns.fact_date) {
            query += ` AND fact_date = '${columns.fact_date}'`
        }
            
        data.facts = await db.raw(`SELECT * FROM ${table_name} WHERE 1=1 ${query}`).then(data => {
            return data[0]
        })
        
    data.categories = await db.select("*").table('categories')
        return data
    }
    async getById(id) {
        let data = {}
        data.facts =  await db.select("*").table(table_name).where('fact_id', id).first()
        
    data.categories = await db.select("*").table('categories')
        return data
    }
    async getByColumn(column, value) {
        let data = {}
        data.facts = await db.select("*").table(table_name).where(column, value)
         
    data.categories = await db.select("*").table('categories')
        return data
    }
    async createList(data) {
        const insert = await db(table_name).insert(data)
        return insert
    }
    async createOne(data) {
        const insert = await db(table_name).insert(data)
        const insertedData = await db.select("*").table(table_name).where('fact_id', insert[0])
            .then(data => {
                return data
            })
        return insertedData[0]
    }
    async updateByID(data, id) {
        const update = await db(table_name)
            .where('fact_id', id)
            .update(data).then(async () => {
                return await db.select("*").table(table_name).where('fact_id', id)
            })

            return update[0] ? update[0] : null
            
    }
    async deleteByID(id) {
        const deletedData = await db(table_name).where('fact_id', id).del().then(data => {
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
        const deletedData = await db(table_name).whereIn('fact_id', list).del().then(data => {
            return data
        });
        return deletedData
    }
}
module.exports = new Facts()
        