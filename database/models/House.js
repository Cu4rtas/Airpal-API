const house = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
house.name = "HOUSE";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
house.href = "/" + house.name.toLowerCase();

//Queries
house.queries = {
  getAll: "SELECT * FROM " + house.name
}

/**
Ejecuta el query getAll definido en house.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla house.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
house.getAll = (callback) => {
    if (connection){
      connection.query(house.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = house;
