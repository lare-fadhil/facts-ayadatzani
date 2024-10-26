
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./../views/Home.vue'),
        meta:{
            auth : false,
            title : 'Home'
        }
    },
    
        {
            path: '/add_facts-list',
            name: 'ListAdd_facts',
            component: () => import('./../views/Add_facts/List.vue'),
            meta:{
                auth : true,
                title : 'Add_facts List'
            }
        },
            {
            path: '/add_facts-list/:id',
            name: 'ViewAdd_facts',
            component: () => import('./../views/Add_facts/Edit.vue'),
            meta:{
                auth : true,
                title : 'Add_facts Edit'
            }
        },
        {
            path: '/categories-list',
            name: 'ListCategories',
            component: () => import('./../views/Categories/List.vue'),
            meta:{
                auth : true,
                title : 'Categories List'
            }
        },
            {
            path: '/categories-list/:id',
            name: 'ViewCategories',
            component: () => import('./../views/Categories/Edit.vue'),
            meta:{
                auth : true,
                title : 'Categories Edit'
            }
        },
        {
            path: '/facts-list',
            name: 'ListFacts',
            component: () => import('./../views/Facts/List.vue'),
            meta:{
                auth : true,
                title : 'Facts List'
            }
        },
        {
            path: '/facts-adding',
            name: 'ListFactsAdding',
            component: () => import('./../views/Facts/Adding.vue'),
            meta:{
                auth : true,
                title : 'Facts List Adding'
            }
        },
            {
            path: '/facts-list/:id',
            name: 'ViewFacts',
            component: () => import('./../views/Facts/Edit.vue'),
            meta:{
                auth : true,
                title : 'Facts Edit'
            }
        },
]
const router = new VueRouter({
    routes,
    mode:'history'
})

export default router
        