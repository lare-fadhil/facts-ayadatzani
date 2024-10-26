
<template>
    <div>
            <v-container class="my-2">
                    <v-layout row wrap px-0 mb-4>
                        <v-flex xs12>
                            <v-card class="mx-1 px-0" style="background-color:transparent!important" flat>
                                <v-card-title class="px-0">
                                    <v-breadcrumbs class="px-0" :items="$store.getters.language.data.categories.list_path">
                                        <template v-slot:item="{ item }">
                                            <v-breadcrumbs-item :to="item.path" :disabled="item.disabled">
                                                {{ item.title.toUpperCase() }}
                                            </v-breadcrumbs-item>
                                        </template>
                                    </v-breadcrumbs>
                                    <v-spacer></v-spacer>
                                    
                                </v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                <form @submit.prevent="addCategories" autocomplete="off">
                    <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="categories.category_title" type="text" :label="$store.getters.language.data.categories.category_title" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.categories.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>

</v-container>

<v-snackbar v-model="snackbar.value" :color="snackbar.color">
    {{snackbar.text}}
</v-snackbar>
</div>
</template>
<script>
    import requests from './../../requests/categories.request.js'
    import * as xlsx from 'xlsx/xlsx.js';
    export default {
        data() {
            return {
                categories: {},
                search: '',
                loading : true,
                loading_btn:false,
                selected_rows : [],
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
                rows:[],
                
                
              
            }
        },
        computed: {
            page(){
                const pageKey = 'CATEGORIES'
                return {}
            }
        },
        mounted(){
            this.readCategories();
        },
        methods: {
            
            addCategories() {
                this.loading_btn = true
                requests.createCategories(this.categories).then(r => {
                    if (r.status == 200) {
                        this.categories = {}
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'Categories Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add Categories',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            
            readCategories() {
                this.loading = true
                requests.getAllCategories().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.categories
                        
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read Categories',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read Categories',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>
                    