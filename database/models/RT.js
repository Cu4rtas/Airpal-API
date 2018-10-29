const rt = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
rt.name = "RT";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
rt.href = "/" + rt.name.toLowerCase();

//Queries
rt.queries = {
  getAll: "SELECT * FROM " + rt.name
}

/**
Ejecuta el query getAll definido en rt.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla rt.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
rt.getAll = (callback) => {
    if (connection){
      connection.query(rt.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = rt;
