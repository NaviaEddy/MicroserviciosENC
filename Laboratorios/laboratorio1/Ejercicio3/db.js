const mysql=require('mysql2');

//Configurar la conexion
const conection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password123password',
    database:'bd_agenda',
    port: "3307"

});

//Conectar a la base de datos
conection.connect((error)=>{
    if(error){
        console.log('Error al conectar a la base de datos');
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports=conection;