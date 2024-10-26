
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
                <v-layout row wrap px-0 mb-4>
                    <v-flex xs9>
                        <v-breadcrumbs class="px-0" :items="$store.getters.language.data.facts.edit_path">
                            <template v-slot:item="{ item }">
                                <v-breadcrumbs-item :to="item.path" :disabled="item.disabled">
                                    {{ item.title.toUpperCase() }}
                                </v-breadcrumbs-item>
                            </template>
                        </v-breadcrumbs>
                    </v-flex>
                    <v-flex xs3>
                    </v-flex>
                </v-layout>
            <form @submit.prevent="updateFacts" autocomplete="off">
                <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="facts.fact_text" type="text" :label="$store.getters.language.data.facts.fact_text" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-select class="mx-1" clearable  :items="categories" v-model="facts.category_id" dense  filled outlined  item-text="category_id"
                                    item-value="category_id" :return-object="false" :label="$store.getters.language.data.categories.category_id">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="facts.fact_date" type="datetime-local" :label="$store.getters.language.data.facts.fact_date" 
                            class="mx-1"  filled outlined dense  >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md2 sm4>
                        <v-btn  color="success"    type="submit">{{$store.getters.language.data.facts.update_btn}}</v-btn>
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
    export default {
        data() {
            return {
                facts: {},
                id: '',
                loading: true,
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
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
            this.id = this.$route.params.id
            this.getOneFacts()
        },
        methods: {
            getOneFacts() {
                this.loading = true
                requests.getOneFacts(this.id).then(r =>{
                    if (r.status == 200) {
                        this.facts = r.data.facts
                        
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
            updateFacts() {
                this.loading = true
                requests.updateFacts(this.id,this.facts).then(r => {
                    if (r.status == 200) {
                        this.snackbar = {
                            value: true,
                            text: 'Facts Updated',
                            color: 'success'
                        }
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Update Faild',
                            color: 'error'
                        }
                        this.loading = false
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Update Faild',
                        color: 'error'
                    }
                    this.loading = false
                })
                .finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>
                    