const express = require('express')
const routes = express.Router()
const instructors = require("./controllers/instructors")

routes.get("/", function(req, res) {
    return res.redirect("instructors")
})

routes.get("/instructors", instructors.instructor)
routes.get("/instructors/create", instructors.create)
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit", instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)

module.exports = routes