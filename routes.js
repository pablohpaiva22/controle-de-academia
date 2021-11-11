const express = require('express')
const routes = express.Router()

routes.get("/", function(req, res) {
    return res.render("layout")
})

routes.get("/instructors", function(req, res) {
    return res.render("instructors/instructorgit")
})

module.exports = routes