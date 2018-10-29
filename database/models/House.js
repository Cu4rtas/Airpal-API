const house = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
house.name = "HOUSE";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
house.href = "/" + house.name.toLowerCase();

//String con las columnas de la casa

//Queries
house.queries = {
  getAll: "SELECT * FROM " + house.name
};

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
  };

house.getColumns = () => {
    q = "SHOW COLUMNS FROM HOUSE";
    strCols = "";
    connection.query(q, (err, rows) => {
        if (err) {
            throw err;
        } else {
            for (row in rows) {
              strCols += rows[row].Field + ", ";
            }
            strCols += "\b\b";
        }
    });
    return strCols;
};


house.insert = (callback, pojo) => {
    connection.insert('HOUSE', pojo, (err, res) => {
        if(err) throw err;
        callback(res);
    });
};


module.exports = house;
