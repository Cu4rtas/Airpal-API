/**
 * Devuelve un JSON con los modelos de cada tabla de la base de datos con la siguiente estructura:
 * name: Nombre de la tabla
 * src: Recurso del modelo de la tabla (Modulo .js)
 * href: Ruta de referencia en el API
**/
module.exports = {
  House: require('./models/House'),

  Activity: require('./models/Activity'),

  Display: require('./models/DisplayStatus'),

  RT: require('./models/RT'),

  DetailHouse: require('./models/DetailHouse'),

  Variables: require('./models/Variables'),

  Alarmconf: require('./models/Alarmconf'),

  Alarms: require('./models/Alarms'),

  Installation: require('./models/Installation'),

  House: require('./models/House'),

  Admin: require('./models/Admin')
}
