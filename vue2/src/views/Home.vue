<template style="align-content: center; ">
	<v-container>

		<div v-if="cards.length > 0" style="    align-content: center;" class="mt-10">
			<v-layout row wrap>
				<v-flex xs12 md12 l12 lg12 xl12>
					<!-- card slide -->
					<template>
						<v-carousel height="80vh" hide-delimiters>
							<v-carousel-item v-for="(slide, i) in cards" :key="i">

								<v-sheet height="100%" class="pb-16" style=" align-content: center; " :style="{backgroundColor: slide.background}">
									<h1 class="py-7 text-center" style="color: aliceblue;">
										ئایا دەتزانی ؟
									</h1>
									<!-- <div class="d-flex fill-height justify-center align-center"> -->
									<div style="align-content: center; justify-content: center; color: aliceblue;">
										<v-layout row wrap>
											<!-- <v-flex xs12 md12 l12 lg12 xl12>

												<h1 class="mx-7 text-center">
												 ئایا دەتزانی ؟
                                                </h1>
											</v-flex> -->
											<v-flex xs12 md12 l12 lg12 xl12>

												<p class="mx-7 text-center" style="font-size: 24px;">
													{{ slide.fact_text }}
												</p>
											</v-flex>
											<v-flex xs12 md12 l12 lg12 xl12 class="text-center mt-5">

												<v-btn color="success" @click="iKnew(slide)" class="mx-2">
													<v-icon>mdi-check</v-icon>
													<span>دەمزانی</span>
												</v-btn>

												<v-btn color="error" class="mx-2" @click="iDidntKnow(slide)">
													<v-icon>mdi-close</v-icon>
													<span>نەمدەزانی</span>
												</v-btn>

											</v-flex>

										</v-layout>
										<div id="chart" class="mr-6" v-if="showbar">
											<apexchart type="bar" height="140" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>

								</v-sheet>
							</v-carousel-item>
						</v-carousel>
					</template>

					<!-- <vue-card-stack :cards="cards" :stack-width="360" :card-width="280" class="stack" >

						<template v-slot:nav="{  onNext, onPrevious }">
							<nav class="nav">
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

								<div style="padding: 16px; text-align: center;">

									<p style="font-size: 24px; font-weight: bold; margin: 0; color: aliceblue;">{{ card.fact_text }}</p>

									<v-divider class="my-3"></v-divider>
									<v-icon color="white" size="50">{{ card.mdicon }}</v-icon>

								</div>
							</div>

						</template>

					</vue-card-stack> -->

				</v-flex>

			</v-layout>
		</div>
	</v-container>

</template>
<script>
	import requests from './../requests/facts.request.js'
	import VueCardStack from "vue-card-stack";
	import apexchart from "vue-apexcharts";


	export default {
		components: {
			VueCardStack,
			apexchart
		},
		data() {
			return {
				showbar: false,
				currentCard: {},
				series: [{
					name: 'Males',
					data: [0]
				},
				{
					name: 'Females',
					data: [0]
				}
				],
				chartOptions: {
					chart: {
						type: 'bar',
						stacked: true,
						toolbar: {
							show: false
						},
					},
					colors: ['#4caf50', '#FF4560'],
					plotOptions: {
						bar: {
							borderRadius: 5,
							borderRadiusWhenStacked: 'all',
							horizontal: true,
						},
					},
					dataLabels: {
						enabled: true
					},
					stroke: {
						width: 1,
						colors: ["#fff"]
					},
					grid: {
						xaxis: {
							lines: {
								show: false // Hides the x-axis grid lines
							}
						},
						yaxis: {
							lines: {
								show: false // Hides the y-axis grid lines
							}
						}
					},
					yaxis: {
						stepSize: 1,
						labels: {
							show: false // Hides y-axis labels
						}
					},
					tooltip: {
						shared: false,
						x: {
							formatter: function (val) {
								return val;
							}
						},
						y: {
							formatter: function (val) {
								return Math.abs(val) + "%";
							}
						}
					},
					title: {
						text: '',
					},
					xaxis: {
						title: {
							text: '', // No title for x-axis
						},
						labels: {
							show: false // Completely hides x-axis labels
						},
						lines: {
							show: false // Hides x-axis line
						},
						tooltip: {
							enabled: false // Disables tooltip for x-axis
						},
						crosshairs: {
							show: false // Hides crosshairs if any
						},
						axisBorder: {
							show: false // Hides the x-axis border
						},
						axisTicks: {
							show: false // Hides the x-axis ticks
						},
					},

				},


				localStoragecard: [],



				showDiv: false, // initially hidden
				yesPercentage: 0,
				noPercentage: 0,
				displayedYesPercentage: 0,
				displayedNoPercentage: 0,
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
			this.localStoragecard = JSON.parse(localStorage.getItem('card')) || [];
			this.readFacts()


		},
		watch: {
			// watch the currentCard
			currentCard: function (val) {
				console.log('currentCard changed', val)
			}
		},
		methods: {

			updateCurrentCard(card) {
				this.currentCard = card
				console.log(card)
			},
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
						// if the fact_id is in localStorage then add fact_answered to yes or no
						this.rows.forEach(row => {
							this.localStoragecard.forEach(card => {
								if (row.fact_id === card.fact_id) {
									row.fact_answered = card.know_fact_status
								}
							})
						})
						this.cards = this.rows.map(f => {
							return {
								fact_text: f.fact_text,
								fact_id: f.fact_id,
								background: colors[Math.floor(Math.random() * colors.length)],
								mdicon: f.category_mdi,
                                count_status_1: f.count_status_1,
                                count_status_0: f.count_status_0,
								know_fact_status: f.fact_answered


							}
						})
						console.log(this.cards)
						this.categories = r.data.categories
						console.log(this.cards.length)
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
			iKnew(cardname) {
				const cardname_clone = { ...cardname }

				delete cardname_clone.mdicon
				delete cardname_clone.background
				delete cardname_clone.fact_text
				cardname_clone.know_fact_status = '1'

				this.localStoragecard.push(cardname_clone)

				localStorage.setItem('card', JSON.stringify(this.localStoragecard));
				requests.createKnowFacts(cardname_clone).then(r => {
					for (let i = 0; i < r.data.new_data.length; i++) {
						if (r.data.new_data[i].know_fact_status == 1) {
							this.yesPercentage = r.data.new_data[i].count
							this.series[0].data[0] = this.yesPercentage
							this.showbar = true

						} else if (r.data.new_data[i].know_fact_status == 0) {
							this.noPercentage = r.data.new_data[i].count
							this.series[1].data[0] = this.noPercentage
							this.showbar = true
						}
					}
					// this.yesPercentage = r.groups_sum[0]['count']
				})
				//  console.log(localStorage)
			},
			iDidntKnow(cardname) {
				// const cardname_clone = map cardname
				const cardname_clone = { ...cardname }

				delete cardname_clone.mdicon
				delete cardname_clone.background
				delete cardname_clone.fact_text
				cardname_clone.know_fact_status = '0'

				this.localStoragecard.push(cardname_clone)

				localStorage.setItem('card', JSON.stringify(this.localStoragecard));
				requests.createKnowFacts(cardname_clone).then(r => {
					for (let i = 0; i < r.data.new_data.length; i++) {
						if (r.data.new_data[i].know_fact_status == 1) {
							this.yesPercentage = r.data.new_data[i].count
							this.series[0].data[0] = this.yesPercentage
							this.showbar = true

						} else {
							this.noPercentage = r.data.new_data[i].count
							this.series[1].data[0] = this.noPercentage
							this.showbar = true
						}
					}
					// this.yesPercentage = r.groups_sum[0]['count']
				})
				//  console.log(localStorage)
			},
		}
	}
</script>
            <style >
	.nav {
		/* position: fixed; */
		top: auto;
		/* width: 100%; */
		/* z-index: 0; Adjust if necessary to ensure it stays on top */
		background-color: #ffffff; /* Optional: Set a background to prevent cards from showing through */
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	/* stack */
	.stack {
		position: fixed;
		/* top: auto; */
		width: 100%;
		z-index: 0; /* Adjust if necessary to ensure it stays on top */
		/* display: flex; */
		justify-content: space-between;
		padding: 10px;
	}
</style>