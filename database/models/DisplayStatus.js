const displayStatus = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
displayStatus.name = "DISPLAYSTATUS";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
displayStatus.href = "/" + displayStatus.name.toLowerCase();

//Queries
displayStatus.queries = {
  getAll: "SELECT * FROM " + displayStatus.name
};

/**
Ejecuta el query getAll definido en displayStatus.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla displayStatus.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
displayStatus.getAll = (callback) => {
    if (connection){
      connection.query(displayStatus.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = displayStatus;
