// const express = require("express")
import express from "express";
import {getUrl, addUrl, deleteUrl} from "./db"
import bodyParser from 'body-parser'

let app = express()
let port = 80;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use(express.static('public'))


app.get("/:token", async (req, res) => {
    getUrl(req.params.token, (data) => {
        res.redirect('http://' + data.url.toString())
    })
})

app.post("/add", async (req, res) => {
    addUrl(req.body.token, req.body.url, (data) => {
        if (data === null) {
            res.redirect("/")
        } else {
            res.send(data)
        }
    })
})


app.listen(port, () => {
    console.log(`Running on Port ${port}`)
})
