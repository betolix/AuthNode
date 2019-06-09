const users = require("../models/userModel");
const hash = require("object-hash");

const jwt = require('jsonwebtoken');
const globals = require('../config/globals'); // CONSTANTES DEL SISTEMA

exports.getUsers = (req, res) => {
  users.getUsers(function(err, response) {
    if (err) {
      res
        .status(500)
        .json({
          estado: false,
          mensaje: "Ocurrio un error intentelo nuevamente",
          sistema: err.message
        });
    }
    res.status(200).json({
      state: true,
      message: "Users avaliable",
      users: response["rows"]
    });
  });
};

exports.signUp = (request, response) => {
  let newUser = {
    name: request.body.name,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    cell: request.body.cell,
    hash: hash({ foo: request.body.email })
  };

  // FIND OUT IF USER ALREADY EXISTS
  users.getUserByEmail(newUser.email, function(err, res) {
    if (err) {
      response.json({
        estado: false,
        mensaje: "Ocurrio un error intentelo nuevamente",
        sistema: err.message
      });
    }
    if (res["length"] == 0) {
      users.createUser(newUser, function(err, res2) {
        if (err) {
          response.json({
            estado: false,
            mensaje: "Ocurrio un error intentelo nuevamente",
            sistema: err.message
          });
        }
        response.json({
          estado: true,
          mensaje: "USER REGISTRATION SUCCESFUL",
          data: res2.rows
        });
      });
    } else {
      response.json({ estado: false, mensaje: "USER ALREADY EXISTS" });
    }
  });
};

exports.signIn = (request, response) => {
  let newUser = {
    email: request.body.email,
    password: request.body.password
  };

  users.getUserByEmail(newUser.email, function(err, res) {
    if (err) {
      response.json({
        estado: false,
        mensaje: "Ocurrio un error intentelo nuevamente",
        sistema: err.message
      });
    }
    if (res["length"] == 0) {
        response.json({
            estado: false,
            mensaje: "El email ingresado no existe",
          });
    }else{
        var realPass = res[0].password;
        users.validatePassAuth(newUser.password, realPass, function(err, isMatch){
            if (err) {
                response.json({
                  estado: false,
                  mensaje: "Ocurrio un error intentelo nuevamente",
                  sistema: err.message
                });
            }

            if (isMatch){

                //global.secret = public.key / private.key
                        const token = jwt.sign({data: res[0]}, globals.JWT_SECRET, {
                            expiresIn: 604800 //Week
                        });
                        
                        response.json({
                            estado : true,
                            mensaje : "Bienvenido al sistema",
                            token: `Bearer ${token}`,
                            usuario : res[0]
                        })

            }else{
                response.json({
                    estado: false,
                    mensaje: "Contaseña incorrecta",
                  });

            }

        });


    }
    
  });
};
