const express = require('express')
const routes = express.Router()
const functions = require("./functions")

routes.get("/", function(req, res) {
    return res.render("layout")
})

routes.get("/instructors", function(req, res) {
    return res.render("instructors/instructor")
})

routes.get("/instructors/create", function(req, res) {
    return res.render("instructors/create")
})

routes.post("/instructors", functions.post)

module.exports = routes