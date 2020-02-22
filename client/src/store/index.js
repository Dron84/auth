import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        api_url: 'http://localhost:3000',
        user: {},
        posts: [],
    },
    mutations:{
        setUser(state,val){
            state.user = val
        },
        setPosts(state,val){
            state.posts = val
        },
        setLike(state,val){
            state.posts[val.index].claps = val.claps
        },
        deletePost(state, val){
            state.posts = state.posts.filter(row=>row._id === val.id ? false: true)
        },
        addPost(state,val){
            state.posts.push(val)
        }
    },
    getters:{
        getApiUrl(state){
            return state.api_url
        },
        getPosts(state){
            return state.posts
        },
        getUser(state){
            return state.user
        },
        userPremissions(state){
            return state.user.role
        },

    },
    actions:{
        getPosts(state){
            axios.get(`${state.getters.getApiUrl}/posts`).then(res=>{
                state.commit('setPosts',res.data)
                return state.getters.getPosts
            })
        },
        addLike(state,id){
            axios.put(`${state.getters.getApiUrl}/addlike/${id.id}`).then(res=>{
                id.claps=res.data.claps
                state.commit('setLike',id)
            })
        },
        deletePost(state,id){
            const _id = id.id
            axios.delete(`${state.getters.getApiUrl}/posts/${_id}`).then(res=>{
                if(res.data.deletedCount===1){
                    state.commit('deletePost',id)
                }
            })
        },
        addPost(state,val){
            state.commit('addPost',val)
        },
        exit(state){
            state.commit('setUser',{})
        }
    }
})

