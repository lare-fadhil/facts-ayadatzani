
<template>
	<div class="my-2">

		<div v-if="cards.length > 0">

			<vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
				<template v-slot:nav="{  onNext, onPrevious }">
					<nav class="nav">
						<!-- <div class="counter">{{activeCardIndex + 1}}/{{cards.length}}</div> -->
						<button v-on:click="onPrevious" class="button">
							<span>
								<v-icon>mdi-chevron-left</v-icon>
							</span>
						</button>
						<button v-on:click="onNext" class="button">
							<span>
								<v-icon>mdi-chevron-right</v-icon>
							</span>
						</button>
					</nav>
				</template>
				<template v-slot:card="{ card }">
					<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; border-radius: 8px" :style="{ backgroundColor: card.background }">
						<!-- bulb -->

						<div style="padding: 16px; text-align: center;">

							<p style="font-size: 24px; font-weight: bold; margin: 0; color: aliceblue;">{{ card.fact_text }}</p>
							<v-divider class="my-3"></v-divider>
							<v-icon color="white" size="50">{{ card.mdicon }}</v-icon>
							<!-- <v-icon color="white" size="50">mdi-food-fork-drink</v-icon> -->
                            
						</div>
					</div>
				</template>

			</vue-card-stack>
		</div>

	</div>
</template>
<script>
	import requests from './../requests/facts.request.js'
	import VueCardStack from "vue-card-stack";


	export default {
		components: {
			VueCardStack,
		},
		data() {
			return {
				cards: [
					// { background: "#00659d" },
					// { background: "#00abbc" },
					// { background: "#e2c58a" },
					// { background: "#fc8890" },
					// { background: "#b35d7f" },
				],
				facts: {},
				search: '',
				loading: true,
				loading_btn: false,
				selected_rows: [],
				snackbar: {
					value: false,
					text: '',
					color: ''
				},
				rows: [],
				categories: [],
				selected_facts: {},
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
					}, {
						text: this.$store.getters.language.data.actions,
						align: 'start',
						sortable: true,
						value: 'fact_id',
					}
				],
			}
		},
		computed: {
			page() {
				const pageKey = 'FACTS'
				return {}
			}
		},
		mounted() {
			this.readFacts();
		},
		methods: {


			readFacts() {
				this.loading = true
				// this.rows = [{ "fact_id": 1, "fact_text": "پشیلەیە لە هەر گوێیەکدا ٣٢ ماسولکەی هەیە", "category_id": 1, "fact_date": "2023-08-22T19:59:44.000Z" }, { "fact_id": 2, "fact_text": "کۆکاکۆلا لە سەرەتادا کۆکاینی تێدابوو", "category_id": 1, "fact_date": null }, { "fact_id": 3, "fact_text": "کوالاکان ڕۆژانە نزیکەی ١٨ کاتژمێر دەخەون", "category_id": 3, "fact_date": "2023-08-22T20:07:12.000Z" }, { "fact_id": 4, "fact_text": "هەموو چاوتروکاندنەکان لە یەک ڕۆژدا یەکسانە بە داخستنی چاوەکانت بۆ ماوەی ٣٠ خولەک", "category_id": 2, "fact_date": "2023-08-22T20:09:42.000Z" }, { "fact_id": 5, "fact_text": "پێت ٢٦ ئێسکی تێدایە", "category_id": 2, "fact_date": "2023-08-22T20:11:38.000Z" }, { "fact_id": 6, "fact_text": "تێکڕای مێشکی مرۆڤ نزیکەی ٧٨% ئاوی تێدایە", "category_id": 2, "fact_date": "2023-08-22T20:12:05.000Z" }, { "fact_id": 7, "fact_text": "ئیسفەنجەکان زیاتر ئاوی سارد هەڵدەگرن وەک گەرم", "category_id": 1, "fact_date": "2023-08-22T20:13:01.000Z" }, { "fact_id": 8, "fact_text": "کەسێکی ئاسایی ٢٥ ساڵ لە خەودا بەسەر دەبات", "category_id": 2, "fact_date": "2023-08-22T20:14:51.000Z" }, { "fact_id": 9, "fact_text": "خۆرێلاکان ناتوانن مەلە بکەن", "category_id": 3, "fact_date": "2023-08-22T22:54:05.000Z" }, { "fact_id": 10, "fact_text": "ناتوانیت خۆت ختوکە بدەیت", "category_id": 1, "fact_date": "2023-08-22T22:54:41.000Z" }, { "fact_id": 11, "fact_text": "زەڕافە ناتوانێت بکۆکێت", "category_id": 3, "fact_date": "2023-08-22T22:55:18.000Z" }, { "fact_id": 12, "fact_text": "زمانت خێراترین بەشە لە جەستەت کە چاک دەبێتەوە", "category_id": 2, "fact_date": "2023-08-22T22:57:37.000Z" }, { "fact_id": 13, "fact_text": "خەیار ٩٦% ئاوە", "category_id": 1, "fact_date": "2023-08-22T23:01:49.000Z" }, { "fact_id": 14, "fact_text": "مانگی هەشت زۆرترین ڕێژەی لەدایکبوونی تێدایە", "category_id": 1, "fact_date": "2023-08-22T23:09:27.000Z" }, { "fact_id": 15, "fact_text": "پشیلە ٦٦%ی ژیانیان بە خەوتن بەسەر دەبەن", "category_id": 3, "fact_date": "2023-08-22T23:10:26.000Z" }, { "fact_id": 16, "fact_text": "فیل تاکە شیردەرە کە ناتوانێت باز بدات", "category_id": 3, "fact_date": "2023-08-22T23:11:35.000Z" }, { "fact_id": 17, "fact_text": "٩٦%ی ئەو مۆمانەی کە دەفرۆشرێن لەلایەن خانمانەوە دەکڕدرێن", "category_id": 1, "fact_date": "2023-08-22T23:13:36.000Z" }, { "fact_id": 18, "fact_text": "ژنان دوو هێندە زیاتر لە پیاوان چاویان دەتروکێنن", "category_id": 2, "fact_date": "2023-08-22T23:16:06.000Z" }, { "fact_id": 19, "fact_text": "تەنها مێشوولەی مێینە گاز دەگرێت", "category_id": 2, "fact_date": "2023-08-22T23:16:46.000Z" }, { "fact_id": 20, "fact_text": "سکۆتلەندا زۆرترین قژ سووری تێدایە", "category_id": 1, "fact_date": "2023-08-22T23:17:23.000Z" }, { "fact_id": 21, "fact_text": "هەمیشە دوولای دژیەکی زار کۆکراوەکەی دەکاتە ٧", "category_id": 1, "fact_date": "2023-08-22T23:19:06.000Z" }, { "fact_id": 22, "fact_text": "ئۆتۆمبێلێک کە بە خێرایی 80 کیلۆمەتر لە کاتژمێرێکدا دەڕوات نیوەی سووتەمەنیەکەی بەکاردەهێنێت بۆ زاڵبوون بەسەر بەرگری بادا", "category_id": 1, "fact_date": "2023-08-22T23:30:18.000Z" }, { "fact_id": 23, "fact_text": "مانگا ددانی بەشی سەرەوەی نییە", "category_id": 3, "fact_date": "2023-11-04T12:59:42.000Z" }, { "fact_id": 24, "fact_text": "ترێ کاتێک دەیخەیتە ناو مایکرۆوەیڤەوە دەتەقێتەوە", "category_id": 1, "fact_date": "2023-11-04T13:02:30.000Z" }]
				// let colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1']
				// 			this.cards = this.rows.map(f => {
				// 				return {
				// 					fact_text: f.fact_text,
				//   background: colors[Math.floor(Math.random() * colors.length)]
				// 				}
				// 			})
				let colors = [
					'#F8BBD0', '#E1BEE7', // Pastels
					'#FF6F61', '#40BFC1', '#FBC02D', '#8E24AA', '#1E88E5', // Vibrants
					'#C5E1A5', '#FFAB91', '#BCAAA4', '#90CAF9', // Earthy
					'#BDBDBD', '#616161', '#424242', // Monochrome
					'#03A9F4', '#FF9800', '#D5006D'  // Themed
				];
				requests.getAllFacts().then(r => {
					if (r.status == 200) {
						this.rows = r.data.facts


						this.cards = r.data.facts.map(f => {
							return {
								fact_text: f.fact_text,
								background: colors[Math.floor(Math.random() * colors.length)],
								mdicon: f.category_mdi
							}
						})
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
            <style>
	body,
	html {
		overflow: hidden;
	}
</style>