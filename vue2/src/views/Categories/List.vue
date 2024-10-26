
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
                                    <!-- <v-btn class="float-right" color="primary" icon  @click="exportExcel">
                                        <v-icon>mdi-file-excel</v-icon>
                                    </v-btn> -->
                                    <v-btn class="float-right" color="primary" icon  to="/add-new-categories">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
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
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-card flat>
            <v-card-text>
                <v-data-table :loading="loading" :headers="headers"  show-select v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="category_id">
                    <template v-slot:[`item.category_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/categories-list/'+item.category_id"  color="teal" class="mx-1">
                                <v-icon> mdi-pencil-outline </v-icon>
                            </v-btn>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="error" icon class="mx-1" v-bind="attrs" v-on="on" >
                                        <v-icon> mdi-delete-outline </v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-text>
                                        {{$store.getters.language.data.categories.delete_question}}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text class="elevation-0">
                                            {{$store.getters.language.data.categories.cancel_btn}}
                                        </v-btn>
                                        <v-btn color="error" class="elevation-0" @click="deleteCategories(item.category_id)">
                                            {{$store.getters.language.data.categories.yes_btn}}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteCategoriesList">{{$store.getters.language.data.categories.delete_list_btn}}</v-btn>
            </v-card-actions>
                
        </v-card>
    </v-flex>
</v-layout>
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
                
                selected_categories : {},
                headers: [

                    
                        { 
                            text: this.$store.getters.language.data.categories.category_title,
                            align: 'start',
                            sortable: true,
                            value: 'category_title',
                        },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'category_id',
        }
                ],
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
            exportExcel(){
                const list = this.rows
                let result = []
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    let obj = {category_id : item.category_id,category_title : item.category_title,
                    }
                    result.push(obj)
                }
				var f = xlsx.utils.json_to_sheet(result)
				var wb = xlsx.utils.book_new()
				xlsx.utils.book_append_sheet(wb, f, 'sheet')
				xlsx.writeFile(wb, result.length+' rows of '+'Categories.xlsx')
            },
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
            deleteCategories(category_id) {
                requests.deleteCategories(category_id).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.category_id != category_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'Categories Deleted',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Delete Faild',
                            color: 'error'
                        }
                    }
                })
            },
            
            deleteCategoriesList() {
                let ids = this.selected_rows.map(m => m.category_id)
                requests.deleteCategoriesList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.category_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' Categories Deleted',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Delete Faild',
                            color: 'error'
                        }
                    }
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
            selectCategories(i) {
                this.selected_categories = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    