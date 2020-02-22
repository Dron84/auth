<template>
    <div v-if="checkLogin">
        <b-field label="Заголовок">
            <b-input type="text" v-model="editpost.title"></b-input>
        </b-field>
        <b-field label="Описание поста">
            <b-input maxlength="1000" type="textarea" v-model="editpost.description"></b-input>
        </b-field>
        <div class="claps">Нравится: {{editpost.claps}}</div>
        <div class="createAt">Дата создания: {{editpost.createdAt}}</div>
        <div class="updateAt">Дата обновления: {{editpost.updateAt}}</div>
        <div class="userId">Последний доступ: {{userinfo}}</div>
        <div class="buttons">
            <b-button type="is-success" @click="savePost">Сохранить и вернуться</b-button>
            <b-button type="is-danger" @click="$router.push({path: '/posts'})">Отменить и вернуться</b-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Input, Button} from 'buefy'
    import axios from 'axios'

    Vue.use(Input, Button)
    export default {
        name: "postedit",
        data() {
            return {
                userinfo: ''
            }
        },
        methods: {
            savePost(){
                console.log('save')
                axios.put(`${this.$store.getters.getApiUrl}/post/`,this.editpost).then(()=>{
                    this.$store.dispatch('getPosts')
                    this.$router.push({path: '/posts'})
                })
            },
            getUserInfo(){
                axios.get(`${this.$store.getters.getApiUrl}/user/${this.editpost.userId}`).then(res=>{
                    console.log('res.data',res.data)
                    this.userinfo = res.data.login
                })
            },
            checkLogin() {
                const premissions = this.$store.getters.userPremissions
                console.log('premissions', premissions)
                if (premissions !== undefined && premissions === 'writer' && this.editpost !== undefined) {
                    return true
                } else {
                    this.$router.push({path: '/auth'})
                    return false
                }
            },
        },
        computed: {
            editpost: {
                get() {
                    const id = this.$route.params.id
                    const posts = this.$store.getters.getPosts
                    return posts.filter(row => row._id === id ? true : false)[0]
                }
            }
        },
        mounted() {
            this.checkLogin()
            this.getUserInfo()
        }
    }
</script>

<style scoped>
.buttons {
    display: flex;
    justify-content: center;
}
</style>