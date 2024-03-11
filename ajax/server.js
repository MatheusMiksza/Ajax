const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))//vai deixer todos os aquivos na msm pasta como statico
app.use(bodyParser.urlencoded({extended: true}))// toda requicisão que chegar como urlencoded vai executar essa aqui
app.use(bodyParser.json)// toda requisissão que vier com json ele ja vai transfor mar em objeto
// colocando assim ele vai aplicar pra qualquer req independente do endpoint

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./upload')
    },
    filename:function(req,file,callback){
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage}).single('arquivo')

//quando vier uma req nesse endpoist vai exetutar a função que tem req(requisição) res(response)
app.get('/teste',(req,res)=> res.send('Ok!')) 

app.post('/upload',(req,res)=>{
    
    upload(req,res,err =>{
        if(err){
            return res.send('Ocorreu um erro.')
        }
        res.send("Concluida com sucesso!")
    })
})

app.post('/formulario',(req,res)=>{
    res.send({
        ...req.body,
        id:1
    })
})

app.get('/parOuImpar',(req,res)=>{
    const par = parseInt(req.query.numero) % 2 === 0

    req.send({
        resultado: par?'par':'impar'
    })

}) 

//executa servidor - npm start
app.listen(8080,()=> console.log('Executando...'))