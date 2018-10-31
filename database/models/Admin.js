const admin = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
admin.name = "ADMIN";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
admin.href = '/' + admin.name.toLowerCase();

//Queries
admin.queries = {
    getAll: 'SELECT * FROM ' + admin.name
};

/**
 Ejecuta el query getAll en la base de datos, el cuál nos retornará todos los datos de la tabla Activity
 Luego ejecuta el callback que se le pasa en @param callback con todos los datos de la tabla activity.name
 **/
admin.getAll = (callback) => {
    if (connection){
        connection.query(admin.queries.getAll, (err, rows) => {
            //Callback for query
            if(err) {
                throw err
            } else {
                callback(null, rows)
            }
        })
    }
};

admin.get = (id, password, callback) => {
    if(connection) {
        let query = admin.queries.getAll + " WHERE ID=\'" + id + "\' AND PASSWORD=\'" + password + '\'';
        connection.query(query, (err, rows) => {
            if(err) throw err;
            callback(rows);
        });
    }
};

admin.insert = (pojo, callback) =>{
    if(connection) {
        connection.insert('ADMIN', pojo, (err, res) => {
            if (err) throw err;
            callback(res);
        });
    }
};
module.exports = admin;
