const mysql=require('mysql2');

//Configurar la conexion
const conection=mysql.createConnection({
    host:process.env.DB_NODE_HOST,
    user:process.env.DB_NODE_USER,
    password:process.env.DB_NODE_PASSWORD,
    database:process.env.DB_NODE_DATABASE,
    port:process.env.DB_NODE_PORT
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