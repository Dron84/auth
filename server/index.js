require('dotenv').config()
const
    express = require('express'),
    bp = require('body-parser'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    app = express(),
    PostsSchema = require('./model/posts'),
    UsersSchema = require('./model/users'),
    {cors} = require('./middleware/index.js');

mongoose.connect(process.env.MONGODB_PATH, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err) => {
    console.warn(err)
})
db.once('open', () => {
    console.log('Connected to DB')
})
function isEmptyObject(object){
    // console.log('object',object,'typeof', typeof object)
    if (object === null || object === undefined) {
        return true
    } else {
        if (Object.entries(object).length === 0) {
            return true
        } else {
            return false
        }
    }
}
const addDefUser = async ()=>{
    const users = [
        {
            login: "writer@mail.com",
            password: '123456',
            role: "writer"
        },
        {
            login: "reader@mail.com",
            password: '123456',
            role: "reader"
        }
    ]
    users.forEach(async user=>{
        const find = await UsersSchema.findOne({login: user.login})
        if(find===null){
            const addUser = new UsersSchema(user)
            addUser.save()
            console.log('Default users added')
        }else{
            console.log(`This user ${user.login} exist`)
        }
    })

}

const addDefPost = async (CountPosts)=>{
    try{
        await addDefUser()
        const find = await PostsSchema.find().exec()
        if(find===null){
            const {_id} = await UsersSchema.findOne({login: 'writer@mail.com'}).exec()
            const defPost = (NumberOfPost) => {
                return {
                    title: `Test ${NumberOfPost}`,
                    description: 'afjgh jdfgj sdfgjjdj flgdfg sds dfg sgkjdfkgjh jshfgjh sdfkgjh sljfdghks jdfgsjdhfg kjsdlfgjkh dlskfg',
                    userId: _id
                }
            }
            for(let i=0; i<CountPosts;i++){
                const post = defPost(i)
                const addPost = new PostsSchema(post)
                addPost.save()
            }
            console.log(`Default post added. Total count is ${CountPosts}`)
        }else{
            console.log(`Default post already added. Total count is ${CountPosts}`)
        }
    }catch (e) {
        console.log('Error: Not found in DB')
    }

}
// add default user and post ( number added posts ) in db run once
addDefPost(1000)


app.use(express.json())
app.use(bp.urlencoded({extended: false}))
app.use(cors)
// app.use('/', express.static('../client/dist/'))
app.post('/login',async (req,res)=>{
    console.log('req.body',req.body)
    const {login,password} = req.body
    const user = await UsersSchema.findOne({login: login}).exec()
    console.log(user,isEmptyObject(user))

    if(!isEmptyObject(user)){
        if(password===user.password){
            user.password = 'hidden'
            res.status(200).json(user)
        }else{
            res.status(203).json({message: 'Пароль не корректный'})
        }
    }else{
        res.status(203).json({message: 'Нет пользователя'})
    }
})
app.get('/posts',async (req,res)=>{
    try{
        const data = await PostsSchema.find().exec()
        res.status(200).json(data)
    }catch (e) {
        res.status(500).json({message: 'Server error'})
    }
})
app.delete('/posts/:postId',(req,res)=>{
    try{
        console.log('req.params.postId',req.params.postId)
        PostsSchema.deleteOne({_id: req.params.postId},(err,info)=> {
            if (err) {throw new Error(err)}
            res.status(200).json(info)
        })
    }catch (e) {
        res.status(500).json({message: e.message})
    }
})
app.put('/addlike/:postId',(req,res)=>{
    try{
        PostsSchema.findById(req.params.postId,(err,info)=>{
            if(err){ throw new Error(err)}
            const claps = info.claps
            info.claps = claps + 1
            info.save()
            res.status(200).json(info)
        })
    }catch (e) {
        res.status(500).json({message: e.message})
    }
})
app.get('/user/:id',(req,res)=>{
    try{
        UsersSchema.findById(req.params.id,(err,info)=>{
            if(err){ throw new Error(err)}
            res.status(200).json(info)
        })
    }catch (e) {
        res.status(500).json({message: e.message})
    }
})
app.put('/post/',(req,res)=>{
    try{
        const {_id,title,description} = req.body
        const date = moment().format('DD-MM-YYYY HH:mm');
        PostsSchema.findById(_id,(err,info)=>{
            if(err) throw new Error(err)
            info.title = title
            info.description = description
            info.updateAt = date
            info.save()
            res.status(200).json(info)
        })
    }catch (e) {
        res.status(500).json({message: e.message})
    }

})
app.post('/post/:userId',async (req,res)=>{
    try {
        const post = req.body
        post['userId'] = req.params.userId
        const info = await new PostsSchema(post)
        info.save(function (err) {
            if (err) throw new Error(err)

            res.status(200).json(info)
        });
    }catch (e) {
        res.status(500).json({message: e.message})
    }
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server start on http://localhost:${process.env.SERVER_PORT} port`)
})