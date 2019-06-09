const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
//const { JWT_SECRET } = require('./configuration');

const pool = require("../db");

const User = require ('../models/user');

var user=null;

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy( {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // FIND THE USER ESPECIFYIED IN TOKEN
        //  const user = "test@gmail.com"//await User.findById(payload.sub); 
        // ACOMODA BIEN ESTE CODIGO

        
        console.log("POOL QUERY");
        
        pool.query(
            "SELECT (correo_electronico) FROM public.user WHERE id = $1",
            [payload.sub],
            (err1, res1) => {
              if (err1) {
                console.log("ERROR EN BUSQUEDA DE USUARIO POR PAYLOAD.SUB");
                return next(err1);
              }
              if (res1.rows != null) {
                console.log("AWESOME");
                console.log(res1.rows);
                user =res1.rows[0].correo_electronico;
                console.log("USER POST QUERY");
                console.log(user);
              }
              console.log("USER POST QUERY 1");
                console.log(user);

                // IF USER DOESNT EXIST HANDLE IT
                if(user ==null) {
                    return done (null, false );
                }

                // OTHERWISE RETUERN THE USER
                console.log("PAYLOAD YEEE");
                done(null, user);            
            }
          ); 
    } catch (error) {
        done(error, false);
    }

}  
)
);



// LOCAL STRATEGY

passport.use(new LocalStrategy ( {
    usernameField: 'email'
}, async (email, password, done) => {

    // FIND THE USER GIVEN THE EMAIL
    const user = await User.findOne( { email } )

    // IF NOT, HANDLE IT
    if (!user) {
        return done(null, false);
    }


    // CHECK IF THE PASSWORD IS CORRECT


    // IF NOT HANDLE IT


    // OTHERWISE RETURN THE USER




} ) );


