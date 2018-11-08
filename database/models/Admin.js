const admin = {};
const connection = require('../connection');
const tableNames = require('../tableNames');
const crypto = require('crypto');

//Nombre de la tabla en la base de datos
admin.name = tableNames.admin;

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
admin.href = '/' + admin.name.toLowerCase();

//Queries
admin.queries = {
    getAll: 'SELECT * FROM ' + admin.name,

    getAllInstallations: ('SELECT * FROM ADMIN INNER JOIN INSTALLATION ON ADMIN.ID = INSTALLATION.INSTALLER')
        .replace(/ADMIN/, admin.name)
        .replace('/INSTALLATION/', tableNames.installation),

    getAdminInstallations: (adminid) => {
        return (admin.queries.getAllInstallations + ' WHERE INSTALLATION.INSTALLER = @')
            .replace(/INSTALLATION/, tableNames.installation)
            .replace('@', adminid);
    }
};

/**
 Ejecuta el query getAll en la base de datos, el cuál nos retornará todos los datos de la tabla Activity
 Luego ejecuta el callback que se le pasa en @param callback con todos los datos de la tabla activity.name
 **/
admin.getAll = (callback) => {
    if (connection){
        connection.query(admin.queries.getAll, (err, rows) => {
            callback(err, rows);
        })
    }
};

admin.get = (id, password, callback) => {
    if(connection) {
        password = crypto.createHash('md5').update(password).digest("hex");
        let query = admin.queries.getAll + " WHERE ID=\'" + id + "\' AND PASSWORD=\'" + password + '\'';
        console.log(query);
        connection.query(query, (err, rows) => {
            callback(err, JSON.parse(JSON.stringify(rows)));
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

admin.getInstallations = (callback) => {
  if(connection) {
      connection.query(admin.queries.getAllInstallations, (err, rows) => {
         callback(err, rows);
      });
  }
};

admin.getAdminInstallations = (id, callback) => {
    if(connection) {
        connection.query(admin.queries.getAdminInstallations(id), (err, rows) => {
           callback(err, rows);
        });
    }
};

module.exports = admin;
