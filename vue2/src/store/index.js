
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import languages from './languages.json'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        languages: languages,
        language: languages[0],
        
        add_facts_list: [],
        
        categories_list: [],
        
        facts_list: [],
        
    },
    getters: {
        language: state => state.language,
        languages: state => state.languages,
        
        add_facts_list: state => state.add_facts_list,
        
        categories_list: state => state.categories_list,
        
        facts_list: state => state.facts_list,
        
    },
    mutations: {
        setLanguage(state, language) {
            state.language = language
        },
        
        setAddFactsList(state, add_facts_list) {
            state.add_facts_list = add_facts_list
        },
        
        setCategoriesList(state, categories_list) {
            state.categories_list = categories_list
        },
        
        setFactsList(state, facts_list) {
            state.facts_list = facts_list
        },
        
    },
    actions: {
        
    },
})
        