const Joi = require('joi');

module.exports ={
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();

            // req.value.body instead of req.body
        }

    },

    schemas: {
        authSchema: Joi.object().keys({
            correo_electronico: Joi.string().email().required(),
            clave: Joi.string().required()
        })

    }
}