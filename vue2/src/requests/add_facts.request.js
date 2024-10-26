
import axios from 'axios';
export default {
    
    async createAddFacts(params)  {
        return await axios.post(`add_facts/create` , params)
    },
    async createAddFactsList(params)  {
        return await axios.post(`add_facts/create/list` , params)
    },
    async updateAddFactsColumn(column , value , data)  {
        return await axios.put(`add_facts/update_list?${column}=${value}` , data)
    },
    async deleteAddFactsList(list)  {
        return await axios.delete(`add_facts/delete_list` , {
            data: {
                list:list
            }
        })
    },
    async reportAddFacts(column , value)  {
        return await axios.get(`add_facts/report?${column}=${value}`)
    },
    async getAllAddFacts()  {
        return await axios.get(`add_facts/all`)
    },
    async getOneAddFacts(add_fact_id)  {
        return await axios.get(`add_facts/all/${add_fact_id}`)
    },
    async getAddFactsByColumn(column , value)  {
        return await axios.get(`add_facts/filter?column=${column}&value=${value}`)
    },
    async deleteAddFacts(add_fact_id)  {
        return await axios.delete(`add_facts/delete/${add_fact_id}`)
    },
    async updateAddFacts(add_fact_id , params)  {
        return await axios.put(`add_facts/update/${add_fact_id}` , params)
    }
}