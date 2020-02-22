<template>
    <div>
        <Paginator :total="posts.length" :currentPage="currentPage" :perPage="perPage"
                   @change="changePages($event)"></Paginator>
        <Card :title="post.title" v-for="(post,index) in showPosts" :key="post.id">
            <template slot="body">
                <p>{{post.description}}</p>
            </template>
            <template slot="footer">
                <div class="footer_wrapper">
                    <div class="date">{{getNormalDate(post.createdAt)}}</div>
                    <div class="buttons">
                        <div v-if="premissons === 'writer'">
                            <router-link tag="button" class="button" :to="`/postedit/${post._id}`">
                                <span>Изменить</span>
                            </router-link>
                            <button class="button" @click="deletePost({id: post._id,index})">
                                <span>Удалить</span>
                            </button>
                        </div>
                        <div v-if="premissons === 'reader'">
                            <button class="button" @click="addLike({id: post._id,index})">
                                <span>Нравится ({{post.claps}})</span>
                            </button>
                        </div>

                    </div>
                </div>
            </template>
        </Card>
        <Paginator :total="posts.length" :currentPage="currentPage" :perPage="perPage"
                   @change="changePages($event)"></Paginator>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Icon} from 'buefy'
    import 'buefy/dist/buefy.css'
    import Paginator from '@/components/paginator'
    // Vue.use(Button)
    Vue.use(Icon)

    import Card from '@/components/Card'

    export default {
        name: "Posts",
        data() {
            return {
                currentPage: 1,
                perPage: 10
            }
        },
        components: {Card, Paginator},
        methods: {
            getNormalDate(date) {
                return `Пост размещен ${date}`
            },
            addLike(id) {
                this.$store.dispatch('addLike', id)
            },
            changePages(val) {
                this.currentPage = val
            },
            deletePost(id) {
                this.$store.dispatch('deletePost', id)
            }
        },
        computed: {
            posts: {
                get() {
                    return this.$store.getters.getPosts
                }
            },
            showPosts: {
                get() {
                    const num = this.perPage * (this.currentPage - 1)
                    return this.posts.slice(num, num + this.perPage)
                }

            },
            premissons: {
                get() {
                    return this.$store.getters.userPremissions
                }
            }
        }
    }
</script>

<style scoped>
    .card {
        margin: 20px 0;
    }
    .footer_wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        margin: 10px 0;
    }
    .date {
        padding-left: 20px;
    }
    .buttons {
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
    }
</style>