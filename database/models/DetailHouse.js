const detailHouse = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
detailHouse.name = "DETAILHOUSE";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
detailHouse.href = "/" + detailHouse.name.toLowerCase();

//Queries
detailHouse.queries = {
  getAll: "SELECT * FROM " + detailHouse.name
}

/**
Ejecuta el query getAll definido en detailHouse.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla detailHouse.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
detailHouse.getAll = (callback) => {
    if (connection){
      connection.query(detailHouse.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = detailHouse;
