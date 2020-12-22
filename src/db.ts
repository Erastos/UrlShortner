// const mongoose = require("mongoose")
import { url } from "inspector"
import mongoose from "mongoose"
import {Schema, model} from "mongoose"

mongoose.connect("mongodb://localhost/urlShortner", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log(error))

let urlSchema = new Schema({
    token: String,
    url: String
})

let urlModel = model("Url", urlSchema)

let testUrl = {token: "og", url: "pond5.com"}

let testInstance = new urlModel(testUrl)

testInstance.save((err) => {
    console.log(err);
})

export async function getUrl(token, callback) {
   urlModel.findOne({"token": token}, (error, data) => {
       callback(data)
   }) 
}

export async function addUrl(token, url, data) {
    let urlObject = {"token": token, "url": url}
    let urlInstance = new urlModel(urlObject)
    urlInstance.save((err) => {
        if (err) {
            data({"status": err})
        } else {
            data(null)
        }
    })

}

export async function deleteUrl(token) {
    urlModel.deleteOne({"token": token}, {}, (err) => {
        console.log(err);
    })
}


