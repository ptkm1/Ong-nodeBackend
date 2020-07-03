//Importando o modulo Express pra variavel Express
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

//Chamando o aplicativo
const app = express();

app.use(cors());

//Dizendo pro express converter o json em algo ententivel
//pelo js, por que na requisição será enviado um arquivo json
app.use(express.json());
app.use(routes);

//Fazendo o aplicativo "ouvir" a porta 3333
app.listen(3333,(req,res)=>{
 return console.log("servidor on") 
});
