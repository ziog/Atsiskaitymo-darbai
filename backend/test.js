const express = require('express')
const app = express()

app.use((req, res) => {
    console.log("MF")
})

app.get("/", (req, res) => {
    res.send("HW")
})

app.listen(3001, () => { console.log("server is running") })