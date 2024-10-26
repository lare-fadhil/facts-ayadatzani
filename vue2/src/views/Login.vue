
        <template>
    <div>
        <v-container fluid class="login-container">
            <v-layout row wrap class="d-flex  align-center justify-center">
                <v-flex xs12 lg4 xl4 class="bg-main-1 login-container d-flex align-center">
                    <v-container>
                        <v-layout row wrap justify-space-around>
                            <v-flex xs12 lg8 xl8 md8>
                                <v-card width="100%" style="background: transparent!important;"
                                    class="elevation-0 px-2">
                                    <v-card-title>
                                        <img style="width:60px;border-radius: 5px;" :src="logobw" alt="logo">
                                    </v-card-title>
                                    <v-card-title primary-title class="mb-10 mt-n5">
                                        Login
                                    </v-card-title>
                                    <v-card-text class="mt-3">
                                        <form @submit.prevent="login" autocomplete="false">
                                            <v-text-field  autocomplete="false" outlined dense
                                                label="Email" v-model="user.email">
                                            </v-text-field>
                                            <v-text-field :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"  v-model="user.password" outlined dense
                                                :type="showPassword ? 'text' : 'password'" label="Password">
                                            </v-text-field>
                                            <v-btn type="submit" class="elevation-0" block color="primary"
                                                :loading="btn_loading">
                                                Login
                                                <v-spacer></v-spacer>
                                                <v-icon right>
                                                    mdi-arrow-right
                                                </v-icon>
                                            </v-btn>
                                        </form>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

            </v-layout>
        </v-container>
        <v-snackbar v-model="msg_error" color="error" bottom center>
            {{msg}}
        </v-snackbar>
    </div>
</template>
<script>
    import {
        auth,
        signInWithEmailAndPassword
    } from '../firebase'
    export default {
        name: 'Login',
        data: () => ({
            logobw: require('../assets/logo.png'),
            user: {
                email: '',
                password: ''
            },
            showPassword: false,
            btn_loading: false,
            msg: 'Wrong email or password',
            msg_error: false,

        }),
        mounted() {
            // if development set default user
            if (process.env.NODE_ENV === 'development') {
                this.user.email = 'admin@void.krd'
                this.user.password = '12345678'
            }
        },
        methods: {
            login() {
                this.btn_loading = true
                signInWithEmailAndPassword(auth, this.user.email, this.user.password)
                    .then((r) => {
                        localStorage.setItem('auth', 'auth')
                        this.$router.replace({
                            path: '/'
                        })
                        // setTimeout(() => {
                        //     window.location.reload()
                        // }, 500);
                        // this.$store.dispatch('login', r.user.uid)
                        this.btn_loading = false
                    })
                    .catch(err => {
                        this.btn_loading = false
                        this.msg = err.message
                        this.msg_error = true
                    })
            }
        },
    };
</script>
<style lang="scss" scoped>
    .login-container {
        height: 100vh;
    }
</style>
        