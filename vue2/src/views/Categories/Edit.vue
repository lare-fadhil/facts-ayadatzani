
<template>
	<div>
		<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
		<v-container v-else class="my-2 text-right">
			<h2>
				{{ categories.category_title }}
			</h2>
			<v-divider class="my-3"></v-divider>
			<ui class="text-right" style="direction: rtl;">
				<h3>
					<li v-for="fact in facts" :key="fact.id" class="ma-3">
						{{ fact.fact_text }}
						<v-divider class="my-3"></v-divider>
					</li>
				</h3>
			</ui>

		</v-container>
		<v-snackbar v-model="snackbar.value" :color="snackbar.color">
			{{snackbar.text}}
		</v-snackbar>
	</div>
</template>
<script>
	import requests from './../../requests/categories.request.js'
	export default {
		data() {
			return {
				categories: {},
				facts: [],
				id: '',
				loading: true,
				snackbar: {
					value: false,
					text: '',
					color: ''
				},

			}
		},
		computed: {

			page() {
				const pageKey = 'CATEGORIES'
				return {}
			}
		},
		mounted() {
			this.id = this.$route.params.id
			this.getOneCategories()
		},
        watch: {
            '$route.params.id': function () {
                this.id = this.$route.params.id
                this.getOneCategories()
            }
        },
        
		methods: {
			getOneCategories() {
				this.loading = true
				requests.getOneCategories(this.id).then(r => {
					if (r.status == 200) {
						this.categories = r.data.categories
						this.facts = r.data.facts
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
                    