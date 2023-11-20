const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('D:\\MachineLearning\\Competition\\web\\traffic'))


app.listen("1001", ()=>{
    console.log("Server running")
})