
<template>
    <v-app>
        <APPNavbar></APPNavbar>
        <v-main>
            <router-view />
        </v-main>
       
    </v-app>
</template>
      
<script>
import APPNavbar from './components/Navbar.vue'
export default {
    components:{
        APPNavbar
    },
    name: 'App',

    data: () => ({
        //
    }),
};
</script>
