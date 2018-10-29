const activity = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
activity.name = "ACTIVITY";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
activity.href = "/" + activity.name.toLowerCase();

//Queries
activity.queries = {
  getAll: "SELECT * FROM " + activity.name
}

/**
Ejecuta el query getAll en la base de datos, el cuál nos retornará todos los datos de la tabla Activity
Luego ejecuta el callback que se le pasa en @param callback con todos los datos de la tabla activity.name
**/
activity.getAll = (callback) => {
      if (connection){
        connection.query(activity.queries.getAll, (err, rows) => {
          //Callback for query
          if(err) {
            throw err
          } else {
            callback(null, rows)
          }
        })
      }
    }

module.exports = activity;
