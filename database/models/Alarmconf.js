const alarmConf = {};
const connection = require('../connection');
//Nombre de la tabla en la base de datos
alarmConf.name = "ALARMCONF";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
alarmConf.href = "/" + alarmConf.name.toLowerCase();

//Queries
alarmConf.queries = {
  getAll: "SELECT * FROM " + alarmConf.name
}

/**
Ejecuta el query getAll definido en alarmConf.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla alarmconf.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
alarmConf.getAll = (callback) => {
    if (connection){
      connection.query(alarmConf.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = alarmConf;
