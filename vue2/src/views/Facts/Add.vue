
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
                                    
                                </v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                <form @submit.prevent="addFacts" autocomplete="off">
                    <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="facts.fact_text" type="text" :label="$store.getters.language.data.facts.fact_text" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="categories" v-model="facts.category_id" dense  filled outlined  item-text="category_id"
                                    item-value="category_id" :return-object="false" :label="$store.getters.language.data.categories.category_id">
                                </v-select>
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

</v-container>

<v-snackbar v-model="snackbar.value" :color="snackbar.color">
    {{snackbar.text}}
</v-snackbar>
</div>
</template>
<script>
    import requests from './../../requests/facts.request.js'
    import * as xlsx from 'xlsx/xlsx.js';
    export default {
        data() {
            return {
                facts: {},
                search: '',
                loading : true,
                loading_btn:false,
                
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
                rows:[],
                categories : [],
                
              
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
        },
    }
</script>
                    