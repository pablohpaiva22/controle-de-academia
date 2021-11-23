const express = require('express')
const routes = express.Router()
const functions = require("./functions")

routes.get("/", function(req, res) {
    return res.redirect("instructors")
})

routes.get("/instructors", functions.instructor)
routes.get("/instructors/create", functions.create)
routes.get("/instructors/:id", functions.show)
routes.get("/instructors/:id/edit", functions.edit)
routes.post("/instructors", functions.post)
routes.put("/instructors", functions.put)
routes.delete("/instructors", functions.delete)

module.exports = routes