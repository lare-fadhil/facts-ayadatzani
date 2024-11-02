
<template>
	<div>
		<v-app-bar  class="elevation-0" color="transparent">
			<v-btn icon="" to="/" >
				<!-- home question -->
                 <v-icon>
                    mdi-home-analytics
                 </v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<!-- <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list class="text-right">
                    <v-list-item v-for="(item , index) in categories" :key="index" :to="'/categories-list/'+item.id">
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item>
                </v-list>

            </v-menu> -->
			<!-- btn to make dialog true -->
			<v-btn icon @click="dialog = true">
				<v-icon>
                    mdi-dots-vertical
                </v-icon>
			</v-btn>
		</v-app-bar>
		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card style="    align-content: center;">
				<v-card-title style="justify-content: right;" class="mb-8">
					<h1 class="text-right">
						جۆرەکان
					</h1>
				</v-card-title>
				<v-card-text>
					<!-- the categories in nice btns -->
					<v-btn v-for="(item , index) in categories" :key="index" :to="'/categories-list/'+item.id" :color="item.color" class="my-4" width="100%" @click="dialog= false" xl>
						<h1 style="color: aliceblue;">
							{{item.name}}
						</h1>
					</v-btn>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						گەڕانەوە
					</v-btn>

				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- <v-navigation-drawer v-model="drawer" app :right="$store.getters.language.rtl">
			<template v-slot:prepend>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="text-center">{{$store.getters.language.app_name}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
			<v-divider class="mt-3"></v-divider>
			<v-list shaped>
				<v-list-item v-for="(item , index) in navigation_links" :key="index" :to="item.path">
					<v-list-item-content>
						<v-list-item-title>{{item.title}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer> -->
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				drawer: null,
				dialog: false,
				categories: [
					{ id: 1, name: 'گشتی', color: '#00659d' },
					{ id: 2, name: 'تەندروستی', color: '#00abbc' },
					{ id: 3, name: 'ئاژەڵەکان', color: '#e2c58a' },
					// {id: 4,name: 'وەرزشی' ,color: '#fc8890'},
					{ id: 5, name: 'مێژوو', color: '#b35d7f' },
					{ id: 6, name: 'خواردنەکان', color: '#fc8890' },



				]
			}
		},
		computed: {
			languages() {
				return this.$store.getters.languages
			},
			navigation_links() {
				return [

					{
						path: '/add_facts-list',
						title: 'Add Facts',
					},

					{
						path: '/categories-list',
						title: 'Categories',
					},

					{
						path: '/facts-list',
						title: 'Facts',
					},

				]
			},
		}
	}
</script>
        