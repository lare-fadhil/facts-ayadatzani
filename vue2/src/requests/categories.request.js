
import axios from 'axios';
export default {
    
    async createCategories(params)  {
        return await axios.post(`categories/create` , params)
    },
    async createCategoriesList(params)  {
        return await axios.post(`categories/create/list` , params)
    },
    async updateCategoriesColumn(column , value , data)  {
        return await axios.put(`categories/update_list?${column}=${value}` , data)
    },
    async deleteCategoriesList(list)  {
        return await axios.delete(`categories/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportCategories(column , value)  {
        return await axios.get(`categories/report?${column}=${value}`)
    },
    async getAllCategories()  {
        return await axios.get(`categories/all`)
    },
    async getOneCategories(category_id)  {
        return await axios.get(`categories/all/${category_id}`)
    },
    async getCategoriesByColumn(column , value)  {
        return await axios.get(`categories/filter?column=${column}&value=${value}`)
    },
    async deleteCategories(category_id)  {
        return await axios.delete(`categories/delete/${category_id}`)
    },
    async updateCategories(category_id , params)  {
        return await axios.put(`categories/update/${category_id}` , params)
    }
}