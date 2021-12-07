const fs = require('fs')
const data = require('../data.json')
const { date } = require('../uteis')
const uteis = require('../uteis')

exports.instructor = function(req, res) {   
    return res.render("members/instructor", { instructors: data.instructors })
}

exports.create = function(req, res) {
    return res.render("members/create")
}

exports.show = function(req, res) {
    const { id } = req.params

    const found_instructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

        if (!found_instructor) {
            return res.send("Instructor not found")
        }
    
    const instructor = {
        ...found_instructor,
        area_de_atuacao: found_instructor.area_de_atuacao.split(","),
        data_de_nascimento: uteis.age(found_instructor.data_de_nascimento),
        created_at: new Intl.DateTimeFormat('pt-BR').format(found_instructor.created_at)
    }
    
    return res.render('instructors/show', { instructor })
    
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("please, fill all fields")
        }
    }

    let { avatar_url_, nome_, email_, data_de_nascimento, sexo_, blood_, peso_, altura_ } = req.body

    data_de_nascimento = Date.parse(data_de_nascimento)
    id = Number(data.members.length) + 1

    data.members.push({
            id,
            avatar_url_,
            nome_,
            data_de_nascimento,
            sexo_,
            blood_,
            peso_,
            email_,
            altura_
        }
    )

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/members")
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const found_instructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

        if (!found_instructor) {
            return res.send("Instructor not found")
        }

    const instructor = {
        ...found_instructor,
    data_de_nascimento: uteis.date(found_instructor.data_de_nascimento)
    }
    
    return res.render("instructors/edit", { found_instructor: instructor })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const found_instructor = data.instructors.find(function(instructor, foundIndex) {
        if (instructor.id == id) {
            index = foundIndex
            return true
        }
    })

        if (!found_instructor) {
            return res.send("Instructor not found")
        }

    const instructor = {
        ...found_instructor,
        ...req.body,
        data_de_nascimento: Date.parse(req.body.data_de_nascimento),
        id: Number(found_instructor.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write file error!")
    }

    return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const id = req.body.id

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send ("Write file error")

        return res.redirect("/instructors")
    })
}