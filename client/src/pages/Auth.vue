<template>
    <div>
        <b-field label="Почта" :type="emailValidator.type" :message="emailValidator.message">
            <b-input type="email" v-model="user.login" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" v-model="user.password" password-reveal></b-input>
        </b-field>
        <b-button type="is-success" @click="getLogin">Войти</b-button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Input,Button} from 'buefy'
    import axios from 'axios'
    const validator = require("email-validator");

    Vue.use(Input,Button)

    export default {
        name: "Auth",
        data(){
            return{
                user: {
                    login: 'writer@mail.com',
                    password: '123456'
                }
            }
        },
        methods:{
            getLogin(){
                let req = async ()=>{
                   return await axios.post(`${this.$store.getters.getApiUrl}/login`,this.user)
                }
                req().then(data=>{
                    if(data.status === 200){
                        this.$store.commit('setUser',data.data)
                        this.$router.push('/posts')
                    }else if(data.status !== 200){
                        this.danger(data.data.message)
                    }
                })
            },
            danger(message) {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: message,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        },
        computed:{
            emailValidator: {
                get(){
                    if(validator.validate(this.user.login)){
                        return {type: 'is-success', message: 'Почта корректна'}
                    }else{
                        return {type: 'is-danger',message: 'Почта не корректна'}
                    }
                },
                set(val){
                    return val
                }
            }
        }

    }
</script>

<style scoped>

</style>