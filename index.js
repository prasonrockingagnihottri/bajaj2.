const express = require('express')
const routes = require('./router/route')
const cors = require('cors')

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
app.use("/", routes);


app.listen(port, () => {
    console.log(`server running on :  ${port}`)
})