// MODEL ES EL UNICO QUE SE CONECTA A LA DB

const bcryptjs = require("bcryptjs");
const pool = require("../db");

module.exports.getUsers = function(callback) {
  pool.query("SELECT * from public.user ", function(error, results) {
    if (error) {
      callback(error, null);
    }
    callback(null, results);
  });
};

module.exports.getUserByEmail = function(email, callback) {
  pool.query(
    "SELECT email, password FROM public.user WHERE email = $1",
    [email],
    function(error, results) {
      if (error) {
        callback(error, null);
      }
      callback(null, results.rows);
    }
  );
};

module.exports.createUser = function(user, callback) {
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      callback(err, null);
    }
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) {
        callback(err, null);
      }
      pool.query(
        "INSERT INTO public.user(nombre, apellido_paterno,email, password, telefono, hash, estado) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [user.name, user.lastName, user.email, hash, user.cell, user.hash, 0],
        function(error, results) {
          if (error) {
            callback(error, null);
          }
          callback(null, results);
        }
      );
    });
  });
};


module.exports.validatePassAuth = function(candidatePasword, hash, callback){
  bcryptjs.compare(candidatePasword,hash, (error, isMatch) => {
      if (error){
          callback(error, null);
      } 
      callback(null, isMatch);
  });
}


// DEBUGG
// SYSTEM respuesta del json
// App.js
// Routes
// Controllers
// Model
