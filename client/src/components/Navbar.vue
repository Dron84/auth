<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Домашняя
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/posts' }">
                Посты
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link class="button is-primary" :to="{path: '/createpost'}" v-if="writer">
                        <strong>Создать пост</strong>
                    </router-link>
                    <router-link class="button is-primary" :to="{ path: '/auth' }" v-if="auth">
                        <strong>Войти</strong>
                    </router-link>
                    <div class="button is-primary" @click="exit" v-else>
                        <strong>Выйти</strong>
                    </div>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    import Vue from 'vue'
    import {Navbar} from 'buefy'
    import 'buefy/dist/buefy.css'

    Vue.use(Navbar)

    export default {
        name: "Navbar",
        methods:{
            exit(){
                this.$store.dispatch('exit')
                this.$router.push('/')
            }
        },
        computed:{
            auth:{
                get(){
                    const user = this.$store.getters.getUser
                    if(user.message === undefined && user.login !== undefined){
                        return false
                    }else{
                        return true
                    }
                }
            },
            writer(){
                const user = this.$store.getters.getUser
                if(user.role==='writer'){
                    return true
                }else{
                    return false
                }
            }
        }
    }
</script>

<style scoped>

</style>