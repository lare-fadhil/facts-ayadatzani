
import axios from 'axios';
export default {
    
    async createFacts(params)  {
        return await axios.post(`facts/create` , params)
    },
    async createFactsList(params)  {
        return await axios.post(`facts/create/list` , params)
    },
    async updateFactsColumn(column , value , data)  {
        return await axios.put(`facts/update_list?${column}=${value}` , data)
    },
    async deleteFactsList(list)  {
        return await axios.delete(`facts/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportFacts(column , value)  {
        return await axios.get(`facts/report?${column}=${value}`)
    },
    async getAllFacts()  {
        return await axios.get(`facts/all`)
    },
    async getOneFacts(fact_id)  {
        return await axios.get(`facts/all/${fact_id}`)
    },
    async getFactsByColumn(column , value)  {
        return await axios.get(`facts/filter?column=${column}&value=${value}`)
    },
    async deleteFacts(fact_id)  {
        return await axios.delete(`facts/delete/${fact_id}`)
    },
    async updateFacts(fact_id , params)  {
        return await axios.put(`facts/update/${fact_id}` , params)
    }
}