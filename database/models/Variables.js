const variables = {}
const connection = require('../connection')

//Nombre de la tabla en la base de datos
variables.name = "VARIABLES"

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
variables.href = "/" + variables.name.toLowerCase()

//QUERIES
variables.queries = {
  get: "SELECT * FROM " + variables.name
}

/**
Ejecuta el query getAll definido en variables.queries en la base de datos, el cuál nos retornará todos los
datos de la tabla Alarmconf
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
variables.getAll = (callback) => {
      if (connection){
        connection.query(variables.queries.get, (err, rows) => {
          //Callback for query
          if(err) {
            throw err
          } else {
            callback(null, rows)
          }
        });
      }
    }

module.exports = variables;
