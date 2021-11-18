const fs = require('fs')
const data = require('./data.json')
const uteis = require('./uteis')

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

    let { avatar_url_, instrutor_, data_de_nascimento, sexo_, area_de_atuacao } = req.body

    data_de_nascimento = Date.parse(data_de_nascimento)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
            id,
            avatar_url_,
            instrutor_,
            data_de_nascimento,
            sexo_,
            area_de_atuacao,
            created_at,
        }
    )

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/instructors")
    })
}