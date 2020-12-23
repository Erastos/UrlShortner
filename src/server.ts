// const express = require("express")
import express from "express";
import { getUrl, addUrl, deleteUrl } from "./db"
import bodyParser from 'body-parser'

let app = express()
let port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static('public'))


app.get("/:token", async (req, res) => {
    getUrl(req.params.token, (data) => {
        if (data === null) {
            res.redirect("/")
        } else {
            res.redirect('http://' + data.url.toString())
        }
    })
})

app.post("/add", async (req, res) => {
    addUrl(req.body.token, req.body.url, (data) => {
        let queryString;
        if (data === null) {
            queryString = "?status=0"
        } else {
            queryString = "?status=1"
        }
        res.redirect("/" + queryString)
    })
})


app.listen(port, () => {
    console.log(`Running on Port ${port}`)
})
