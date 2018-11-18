const house = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
house.name = "HOUSE";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
house.href = "/" + house.name.toLowerCase();

//String con las columnas de la casa

//Queries
house.queries = {
    getAll: "SELECT * FROM " + house.name,

    /**
     * Query that will get all the data of a house by knowing its id
     * @param houseid
     * @returns {string}
     */
    get: houseid => {
        query = "SELECT * FROM HOUSE WHERE ID=houseid";
        query = query.replace(/HOUSE/, house.name).replace('houseid', houseid);
        return query;
    },

    /**
     * Query that will get the code of a display where a condition
     */
    getDisplayWhere: 'SELECT DISPLAY FROM HOUSE INNER JOIN INSTALLATION ON HOUSE.ID = INSTALLATION.HOUSECODE WHERE CONDITION',

    /**
     * Query that will get the code of a display by knowing its house id
     */
    getDisplayHouseId: (houseId) => {
        return house.queries.getDisplayWhere.replace('CONDITION', 'ID=' + houseId);
    },


    /**
     * Query that will get the status of the display of a particular house
     * @param houseid
     */
    getDisplayStatus: houseid => {
        let tables = require('../tables');
        let query = "SELECT *\n" +
                    "FROM DISPLAYSTATUS\n" +
                    "WHERE ID IN (\n" +
                    "SELECT DISPLAY\n" +
                    "FROM INSTALLATION\n" +
                    "WHERE HOUSECODE = @)"
                    .replace(/DISPLAYSTATUS/g, tables.Display.name)
                    .replace(/INSTALLATION/g, tables.Installation.name)
                    .replace('@', houseid);
        return query;
    },


    /**
     * Query that will get the code of a display by knowing its house email
     */
    getDisplayHouseEmail: (houseEmail) => {
        let queryEmail = house.queries.getDisplayWhere.replace('CONDITION', 'EMAIL=@');
        queryEmail = queryEmail.replace('@', '\'' + houseEmail + '\'');
        return queryEmail;
    },

    /**
     * THIS QUERY WILL GET ALL THE INSTALLATION INFO OF ALL THE HOUSES
     */
    getAllInstallations: "SELECT * FROM HOUSE INNER JOIN INSTALLATION ON HOUSE.ID = INSTALLATION.HOUSECODE",

    /**
     * Query that will get the variables measured in a house by knowing its id
     * @param houseid
     * @returns {string}
     */
    getHouseVariables: (houseid) => {
        var tables = require('../tables');
        let query = "SELECT HOUSE.NAME, HOUSE.LASTNAME, HOUSE.ADDRESS, INSTALLATION.HOUSECODE, VARIABLES.*\n" +
        "FROM HOUSE \n" +
        "INNER JOIN INSTALLATION\n" +
        "ON INSTALLATION.HOUSECODE = HOUSE.ID\n" +
        "INNER JOIN VARIABLES\n" +
        "ON INSTALLATION.DISPLAY = VARIABLES.DISPLAY\n" +
        "WHERE HOUSECODE = @";
        query = query.replace(/INSTALLATION/g, tables.Installation.name)
            .replace(/HOUSE/g, tables.House.name)
            .replace(/VARIABLES/g, tables.Variables.name)
            .replace('@', houseid);
        return query;
    },

    /**
     * Query that will get the daily RT of a house by knowing its id
     * @param houseid
     * @returns {string}
     */
    getHouseRT: (houseid) => {
            var tables = require('../tables');
            let query = "SELECT INSTALLATION.HOUSECODE, INSTALLATION.INSTALLER, RT.*\n" +
                "FROM HOUSE \n" +
                "INNER JOIN INSTALLATION\n" +
                "ON INSTALLATION.HOUSECODE = HOUSE.ID\n" +
                "INNER JOIN RT\n" +
                "ON INSTALLATION.DISPLAY = RT.DISPLAY\n" +
                "WHERE HOUSECODE = @";
            query = query.replace(/INSTALLATION/g, tables.Installation.name)
                .replace(/HOUSE/g, tables.House.name)
                .replace(/RT/g, tables.RT.name)
                .replace('@', houseid);
            return query;
    }
};

/**
 * Will exec the query getAll defined at house.queries on the DB
 * This query will return us all the houses, and after that it'll exec the callback at param @callback
**/
house.getAll = callback => {
    if (connection){
      connection.query(house.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) throw err;
        callback(rows);
      });
    }
  };


/**
 * Returns the code of the display of a house by knowing the house's id or the house email
 * @param req
 * @param res
 */
house.getHouseDisplay = (req, callback) => {
    if(connection) {
        let query = 'SELECT DISPLAY FROM HOUSE INNER JOIN INSTALLATION ON HOUSE.ID = INSTALLATION.HOUSECODE WHERE ID = \'54\'';
        if (req.query.houseid) {
            query = house.queries.getDisplayHouseId(req.query.houseid);
        } else if (req.query.houseemail) {
            query = house.queries.getDisplayHouseEmail(req.query.houseemail);
        }
        connection.query(query, (err, rows) => {
            if(err) throw err;
            callback(rows);
        });
    }
};

/**
 * Get the variables measured in a house by knowing its id
 * @param houseid
 * @param callback
 */
house.getHouseVariables = (houseid, callback) => {
    if(connection) {
        let query = house.queries.getHouseVariables(houseid);
        connection.query(query, (err, rows) => {
            callback(err, rows);
        });
    }
};

/**
 * Get the variables measured in a house by knowing its id
 * @param houseid
 * @param callback
 */
house.getHouseRT = (houseid, callback) => {
    if(connection) {
        let query = house.queries.getHouseRT(houseid);
        connection.query(query, (err, rows) => {
            console.log(query);
            if(err) throw err;
            callback(rows);
        });
    }
};

house.getAllInstallations = (callback) => {
    if(connection) {
        connection.query(house.queries.getAllInstallations, (err, rows) => {
            callback(err, rows);
        })
    }
};

/**
 * Inserts a new house in the db
 * Throws err if pojo.ID already exists in the table
 * @param pojo for the house
 * @param callback what you're gonna do with the data
 */
house.insert = (pojo, callback) => {
    if(connection) {
        connection.insert('HOUSE', pojo, (err, res) => {
            callback(err, res);
        });
    }
};

house.get = (houseid, callback) => {
    if(connection){
        connection.query(house.queries.get(houseid), (err, res) => {
            callback(err, res);
        })
    }
};


house.getDisplayStatus = (houseid, callback) => {
    if(connection){
        console.log(house.queries.getDisplayStatus(houseid));
        connection.query(house.queries.getDisplayStatus(houseid), (err, rows) => {
           callback(err, rows);
        });
    }
};

module.exports = house;
