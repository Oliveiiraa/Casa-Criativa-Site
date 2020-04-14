// Express criou o servidor
const express = require('express')
const server = express()

const db = require("./db")

/* const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercicios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://saude.abril.com.br/"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://saude.abril.com.br/"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://saude.abril.com.br/"
    },   

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "https://saude.abril.com.br/"
    },
] */

// Configurar arquivos estáticos (css, script, imagens)
server.use(express.static("public"))

// Configuração do NunJucks
const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache:true,
})

// Habilitar uso do req.body
server.use(express.urlencoded({extended:true}))

// Rota /
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reverseIdeas) {
            if(lastIdeas.length < 3){
                lastIdeas.push(idea)
            }
        }
    
        return res.render('index.html', {ideas:lastIdeas})
    })
})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        
    const reverseIdeas = [...rows].reverse()

    return res.render('ideias.html', {ideas: reverseIdeas})
    })

})

server.post("/", function(req,res) {
    const query =`
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`
const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
] 

    db.run(query, values, function(err){
    if (err) return console.log(err)

    return res.redirect("/ideias")
})
})

// Servidor ligado na porta 3000
server.listen(3000)