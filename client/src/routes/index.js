import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '../pages/Auth'
import Posts from '../pages/Posts'

Vue.use(VueRouter)

const routes = [
    { path: '/posts', component: Posts },
    { path: '/auth', component: Auth }
]

export const router = new VueRouter({
    routes,
    mode: 'history'
})