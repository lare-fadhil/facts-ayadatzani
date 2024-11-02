<template>
    <v-container>

        <div v-if="cards.length > 0" style=" align-content: center;">
            <v-layout row wrap>
                <v-flex xs12 md12 l12 lg12 xl12>
                    <!-- card slide -->
                    <v-carousel height="90vh" hide-delimiters>
                        <v-carousel-item v-for="(slide, i) in cards" :key="i">

                            <v-sheet height="100%" class="pb-16" style=" padding-top: 20vh; "
                                :style="{ backgroundColor: slide.background }">
                                <h1 class="pb-7 text-center" style="color: aliceblue;">
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
                                            <!-- {{ slide.know_fact_status }} -->
                                            <v-btn color="success" @click="iKnew(slide)" class="mx-2"
                                                v-if="!slide.know_fact_status">
                                                <v-icon>mdi-check</v-icon>
                                                <span>دەمزانی</span>
                                            </v-btn>

                                            <v-btn color="error" class="mx-2" @click="iDidntKnow(slide)"
                                                v-if="!slide.know_fact_status">
                                                <v-icon>mdi-close</v-icon>
                                                <span>نەمدەزانی</span>
                                            </v-btn>
                                            <v-chip color="success" class="mx-2" v-if="slide.know_fact_status == '1'">
                                                <v-icon>mdi-check</v-icon>
                                                <span>دەمزانی</span>
                                            </v-chip>
                                            <v-chip color="error" class="mx-2"
                                                v-if="slide.know_fact_status == '2' || slide.know_fact_status == '0'">
                                                <v-icon>mdi-close</v-icon>
                                                <span>نەمدەزانی</span>
                                            </v-chip>
                                            <v-flex xs12 class="text-center" style="margin-left: 5vh;"
                                                v-if="slide.know_fact_status || slide.know_fact_status != null">

                                                <apexchart type="bar" height="150" :options="chartOptions" :series='[
                                                    {
                                                        name: "دەمزانی",
                                                        data: [slide.count_status_1 || yesPercentage],


                                                    },
                                                    {
                                                        name: "نەمدەزانی",
                                                        data: [slide.count_status_0 || noPercentage]
                                                    }
                                                ]' style="align-items: center; justify-content: center; ">
                                                </apexchart>
                                                <!-- label -->

                                            </v-flex>
                                        </v-flex>

                                    </v-layout>


                                    <!-- <div id="chart" class="mr-6" v-if="showbar">
											<apexchart type="bar" height="140" :options="chartOptions" :series="series"></apexchart>
										</div> -->
                                </div>

                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>



                </v-flex>

            </v-layout>
        </div>
        <div class="footer">
            <!-- <h2 style="text-align: center;">ئەمانەش بەردەستە</h2> -->
            <h4 style="text-align: center; font-family: Arial !important ;">
                Developed by Lare Fadhil
             </h4>
        </div>

    </v-container>

</template>
<script>
import requests from './../requests/facts.request.js'
import VueCardStack from "vue-card-stack";
import apexchart from "vue-apexcharts";
import VueApexCharts from 'vue-apexcharts';


export default {
    components: {
        VueCardStack,
        apexchart
    },
    data() {
        return {
            showbar: false,
            currentCard: {},

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
                        // borderRadius: 25,
                        // borderRadiusApplication: 'end', // 'around', 'end'
                        // borderRadiusWhenStacked: 'all', // 'all', 'last'
                        horizontal: true,
                        // barHeight: '80%',
                    },
                },
                dataLabels: {
                    enabled: true,
                    // font size of the data labels
                    style: {
                        fontSize: '20px',
                    },
                    formatter: function (val) {
                        return val + " : دەنگ";
                    },

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
                    stepSize: 0,
                    labels: {
                        show: false // Hides y-axis labels
                    }
                },
                tooltip: {
                    shared: false,
                    x: {

                    },
                    y: {

                    }
                },
                title: {
                    text: '',
                },
                xaxis: {
                    categories: [''],
                    title: {
                        text: '', // No title for x-axis
                    },
                    labels: {
                        show: false // Completely hides x-axis labels,
                        ,

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
                tooltip: {
                    enabled: false, // Disable tooltip when hovering over the chart
                },
                legend: {
                    show: true
                    ,
                    onItemClick: {
                        toggleDataSeries: false // Disable legend item click
                    },
                    onItemHover: {
                        highlightDataSeries: false // Disable legend item hover
                    },
                    // color
                    labels: {
                        colors: '#fff'
                    }
                    ,
                    offsetX: -50 // No offset from the left
                },
                // labels: ['دەمزانی', 'نەمدەزانی'],

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

            let colors = [
                '#F8BBD0', '#E1BEE7', // Pastels
                '#FF6F61', '#40BFC1', '#FBC02D', '#8E24AA', '#1E88E5', // Vibrants
                 '#FFAB91', '#BCAAA4', '#90CAF9', // Earthy
                '#616161', '#424242', // Monochrome
                '#03A9F4', '#FF9800', '#D5006D'  // Themed
            ];
            requests.getAllFacts().then(r => {
                if (r.status == 200) {
                    this.rows = r.data.facts
                    console.log(this.rows)
                    // if the fact_id is in localStorage then add fact_answered to yes or no
                    this.rows.forEach(row => {
                        this.localStoragecard.forEach(card => {
                            if (row.fact_id === card.fact_id) {
                                row.fact_answered = card.know_fact_status
                            }
                        })
                    })
                    console.log(this.rows)
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
            delete cardname_clone.count_status_1
            delete cardname_clone.count_status_0
            cardname_clone.know_fact_status = '1'

            this.localStoragecard.push(cardname_clone)
            this.yesPercentage = 0
            this.noPercentage = 0
            localStorage.setItem('card', JSON.stringify(this.localStoragecard));
            requests.createKnowFacts(cardname_clone).then(r => {
                for (let i = 0; i < r.data.new_data.length; i++) {
                    if (r.data.new_data[i].know_fact_status == 1) {
                        this.yesPercentage = r.data.new_data[i].count
                        // this.series[0].data[0] = this.yesPercentage
                        cardname.count_status_1 = this.yesPercentage

                        // this.showbar = true

                    } else if (r.data.new_data[i].know_fact_status == 0) {
                        this.noPercentage = r.data.new_data[i].count
                        // this.series[1].data[0] = this.noPercentage
                        cardname.count_status_0 = this.noPercentage
                        // this.showbar = true
                    }
                    this.cards = this.cards.map(card => {
                        if (card.fact_id === cardname.fact_id) {
                            card.know_fact_status = 1
                        }
                        return card
                    })
                }
                // this.yesPercentage = r.groups_sum[0]['count']
            })
            //  console.log(localStorage)
        },
        iDidntKnow(cardname) {
            const cardname_clone = { ...cardname }

            delete cardname_clone.mdicon
            delete cardname_clone.background
            delete cardname_clone.fact_text
            delete cardname_clone.count_status_1
            delete cardname_clone.count_status_0
            cardname_clone.know_fact_status = '0'

            this.localStoragecard.push(cardname_clone)
            this.yesPercentage = 0
            this.noPercentage = 0
            localStorage.setItem('card', JSON.stringify(this.localStoragecard));
            requests.createKnowFacts(cardname_clone).then(r => {

                for (let i = 0; i < r.data.new_data.length; i++) {

                    if (r.data.new_data[i].know_fact_status == 1) {
                        this.yesPercentage = r.data.new_data[i].count || 0
                        // this.series[0].data[0] = this.yesPercentage
                        cardname.count_status_1 = this.yesPercentage

                        // this.showbar = true

                    } else if (r.data.new_data[i].know_fact_status == 0) {
                        this.noPercentage = r.data.new_data[i].count || 0
                        // this.series[1].data[0] = this.noPercentage
                        cardname.count_status_0 = this.noPercentage
                        // this.showbar = true
                    }
                    this.cards = this.cards.map(card => {
                        if (card.fact_id === cardname.fact_id) {
                            card.know_fact_status = 2
                        }
                        return card
                    })
                }
                // this.yesPercentage = r.groups_sum[0]['count']

                // this.yesPercentage = r.groups_sum[0]['count']
            })
            //  console.log(localStorage)
        },
    }
}
</script>
<style>
body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}
.nav {
    /* position: fixed; */
    top: auto;
    /* width: 100%; */
    /* z-index: 0; Adjust if necessary to ensure it stays on top */
    background-color: #ffffff;
    /* Optional: Set a background to prevent cards from showing through */
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

/* stack */
.stack {
    position: fixed;
    /* top: auto; */
    width: 100%;
    z-index: 0;
    /* Adjust if necessary to ensure it stays on top */
    /* display: flex; */
    justify-content: space-between;
    padding: 10px;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;

}
</style>