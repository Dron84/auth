import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/pages/Auth'
import Posts from '@/pages/Posts'
import PostEdit from '@/pages/postedit'
import createPost from '@/pages/createpost'
import Home from '@/pages/home'

Vue.use(VueRouter)

const routes = [
    { path: '/posts', component: Posts },
    { path: '/postedit/:id', component: PostEdit},
    { path: '/auth', component: Auth },
    { path: '/createpost', component: createPost },
    { path: '/', component: Home },
]

export const router = new VueRouter({
    routes,
    mode: 'history'
})