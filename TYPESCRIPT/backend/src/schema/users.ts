import Joi from "joi";
export const UserSchema = Joi.object({
  username: Joi.string().required().max(50).min(5).messages({
    "string.base": "username is required",
  }),
  email: Joi.string().required().max(50).min(10).email().messages({
    "string.email": "Email must be a valid format",
  }),
  Address: Joi.string().required().max(50).messages({
    "string.base": "Address should be in valid fromat",
  }),

  PhoneNumber: Joi.string().required().min(10).messages({
    "string.base": "10 is the minimum requirement",
  }),
  password: Joi.string()
    .required()
    .min(5)
    .max(10)
    .regex(/^[a-zA-Z0-9][^a-zA-Z0-9][a-zA-Z0-9]*$/)
    .messages({
      "string.base":
        "Password should be minimum of 5 character and max of 10 character",
    }),
});
