
<template>
	<div>
		<v-app-bar app class="elevation-0">
			<v-app-bar-nav-icon color="primary" @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-btn icon="" to="/" color="primary">
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-app-bar-title>{{$store.getters.language.app_name}}</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
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
            </v-menu>

		</v-app-bar>
		<v-navigation-drawer v-model="drawer" app :right="$store.getters.language.rtl">
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
		</v-navigation-drawer>
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				drawer: null,
				categories: [
					{id: 1,name: 'گشتی'},
					{id: 2,name: 'تەندروستی'},
					{id: 3,name: 'ئاژەڵەکان'},
					{id: 4,name: 'وەرزشی'},
					{id: 5,name: 'مێژوو'},
					{id: 6,name: 'خواردنەکان'}



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
        