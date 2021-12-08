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

    const found_member = data.members.find(function(member) {
        return member.id == id
    })

        if (!found_member) {
            return res.send("member not found")
        }
    
    const member = {
        ...found_member,
        data_de_nascimento: uteis.age(found_member.data_de_nascimento),
        created_at: new Intl.DateTimeFormat('pt-BR').format(found_member.created_at)
    }
    
    return res.render('members/show', { member })
    
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

    const found_member = data.members.find(function(member) {
        return member.id == id
    })

        if (!found_member) {
            return res.send("member not found")
        }

    const member = {
        ...found_member,
    data_de_nascimento: uteis.date(found_member.data_de_nascimento)
    }
    
    return res.render("members/edit", { found_member: member })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const found_instructor = data.members.find(function(instructor, foundIndex) {
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

    data.members[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write file error!")
    }

    return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const id = req.body.id

    const filteredInstructors = data.members.filter(function(instructor) {
        return instructor.id != id
    })

    data.members = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send ("Write file error")

        return res.redirect("/members")
    })
}