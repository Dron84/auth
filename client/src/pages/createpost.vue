<template>
    <div v-if="checkLogin">
        <b-field label="Заголовок" :type="title.type" :message="title.message">
            <b-input type="text" v-model="newpost.title"></b-input>
        </b-field>
        <b-field label="Описание поста" :type="description.type" :message="description.message">
            <b-input maxlength="1000" type="textarea" v-model="newpost.description"></b-input>
        </b-field>
        <div class="buttons">
            <b-button type="is-success" @click="savePost">Сохранить и вернуться</b-button>
            <b-button type="is-danger" @click="$router.push({path: '/posts'})">Отменить и вернуться</b-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "createpost",
        data(){
            return{
                newpost: {
                    title: '',
                    description: ''
                },
                title:{
                    type: '',
                    message: ''
                },
                description:{
                    type: '',
                    message: ''
                },
            }
        },
        methods:{
            savePost(){
                if(this.newpost.title!==''&&this.newpost.description!==''){
                    this.title = {type: '',message: ''}
                    this.description = {type: '',message: ''}
                    axios.post(`${this.$store.getters.getApiUrl}/post/${this.$store.getters.getUser._id}`,this.newpost).then(res=>{
                        this.$store.dispatch('addPost',res.data)
                        this.$router.push({path: '/posts'})
                    })
                }else if(this.newpost.title===''){
                    this.title = {type: 'is-danger',message: 'Пустой заголовок'}
                }else if(this.newpost.description===''){
                    this.description = {type: 'is-danger',message: 'Пустое описание'}
                }
            },
            checkLogin() {
                const premissions = this.$store.getters.userPremissions
                console.log('premissions', premissions)
                if (premissions !== undefined && premissions === 'writer') {
                    return true
                } else {
                    this.$router.push({path: '/auth'})
                    return false
                }
            },
        },
        mounted(){
            this.checkLogin()
        }

    }
</script>

<style scoped>
    .buttons{
        display: flex;
        justify-content: center;
    }
</style>