
<template>
    <div>
            <v-container class="my-2">
                    <v-layout row wrap px-0 mb-4>
                        <v-flex xs12>
                            <v-card class="mx-1 px-0" style="background-color:transparent!important" flat>
                                <v-card-title class="px-0">
                                    <v-breadcrumbs class="px-0" :items="$store.getters.language.data.facts.list_path">
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
                                    <v-btn class="float-right" color="primary" icon  to="/add-new-facts">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                <form @submit.prevent="addFacts" autocomplete="off">
                    <v-layout row wrap>
        
                    <v-flex xs12 lg8 xl8 md8 sm8>
                        <v-text-field v-model="facts.fact_text" type="text" :label="$store.getters.language.data.facts.fact_text" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-autocomplete class="mx-1" clearable  :items="categories" v-model="facts.category_id" dense  filled outlined  item-text="category_title"
                                    item-value="category_id" :return-object="false" :label="$store.getters.language.data.categories.category_title">
                                </v-autocomplete>
                        </v-flex>
                
                   <!-- <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="facts.fact_date" type="datetime-local" :label="$store.getters.language.data.facts.fact_date" dense
                            class="mx-1"  filled outlined >
                        </v-text-field>
                    </v-flex> -->
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.facts.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-card flat>
            <v-card-text>
                <v-data-table :loading="loading" :headers="headers"  show-select v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="fact_id">
                    <template v-slot:[`item.fact_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/facts-list/'+item.fact_id"  color="teal" class="mx-1">
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
                                        {{$store.getters.language.data.facts.delete_question}}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text class="elevation-0">
                                            {{$store.getters.language.data.facts.cancel_btn}}
                                        </v-btn>
                                        <v-btn color="error" class="elevation-0" @click="deleteFacts(item.fact_id)">
                                            {{$store.getters.language.data.facts.yes_btn}}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteFactsList">{{$store.getters.language.data.facts.delete_list_btn}}</v-btn>
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
    import requests from '../../requests/facts.request.js'
    import * as xlsx from 'xlsx/xlsx.js';
    
    export default {
        
        data() {
            return {
                facts: {},
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
                categories : [],
                selected_facts : {},
                headers: [

                    
                        { 
                            text: this.$store.getters.language.data.facts.fact_text,
                            align: 'start',
                            sortable: true,
                            value: 'fact_text',
                        },
                    {
                        text: this.$store.getters.language.data.categories.category_id,
                        align: 'start',
                        sortable: true,
                        value: 'category_id',
                    },
                        { 
                            text: this.$store.getters.language.data.facts.fact_date,
                            align: 'start',
                            sortable: true,
                            value: 'fact_date',
                        },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'fact_id',
        }
                ],
            }
        },
        computed: {
            page(){
                const pageKey = 'FACTS'
                return {}
            }
        },
        mounted(){
            this.readFacts();
        },
        methods: {
            exportExcel(){
                const list = this.rows
                let result = []
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    let obj = {fact_id : item.fact_id,fact_text : item.fact_text,category_id : item.category_id,fact_date : item.fact_date,
                    }
                    result.push(obj)
                }
				var f = xlsx.utils.json_to_sheet(result)
				var wb = xlsx.utils.book_new()
				xlsx.utils.book_append_sheet(wb, f, 'sheet')
				xlsx.writeFile(wb, result.length+' rows of '+'Facts.xlsx')
            },
            addFacts() {
                this.loading_btn = true
                requests.createFacts(this.facts).then(r => {
                    if (r.status == 200) {
                        this.facts = {}
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'Facts Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add Facts',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            deleteFacts(fact_id) {
                requests.deleteFacts(fact_id).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.fact_id != fact_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'Facts Deleted',
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
            
            deleteFactsList() {
                let ids = this.selected_rows.map(m => m.fact_id)
                requests.deleteFactsList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.fact_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' Facts Deleted',
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
            
            readFacts() {
                this.loading = true
                requests.getAllFacts().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.facts
                        
            this.categories = r.data.categories
            
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read Facts',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read Facts',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            selectFacts(i) {
                this.selected_facts = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    