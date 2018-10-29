const display = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
display.name = "DISPLAY";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
display.href = "/" + display.name.toLowerCase();

//Queries
display.queries = {
  getAll: "SELECT * FROM " + display.name
}

/**
Ejecuta el query getAll definido en display.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla display.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
display.getAll = (callback) => {
    if (connection){
      connection.query(display.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = display;
