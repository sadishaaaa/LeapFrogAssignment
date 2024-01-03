import Joi from "joi";
export const UserSchema = Joi.object({
  username: Joi.string().required().max(50).min(5).messages({
    "string.base": "username is required",
    "string.empty": "Task cannot be empty",
    "string.required": "User Name is required",
    "string.max": "User Name should not exeed  50 charcter ",
    "string.min": "User Name should  have atleast 5 charcter ",
  }),
  email: Joi.string().required().max(50).min(10).email().messages({
    "string.email": "Email must be a valid format",
    "string.empty": "Task cannot be empty",
    "string.required": "Email is required",
    "string.min": "Email should contain at least 10 characters",
    "string.max": "Email should not exceed 50 characters",
  }),
  Address: Joi.string().required().max(50).messages({
    "string.base": "Address should be in valid format",
    "string.empty": "Task cannot be empty",
    "string.required": "Address is required",
    "string.max": "Address should not exceed 50 characters",
  }),

  PhoneNumber: Joi.string().required().min(10).messages({
    "string.base": "10 is the minimum requirement",
    "string.required": "Phone Number is required",
    "string.empty": "Task cannot be empty",
    "string.min": "PhoneNumber should be at least 10",
  }),
  password: Joi.string()
    .required()
    .min(5)
    .max(10)
    .regex(/^[a-zA-Z0-9][^a-zA-Z0-9][a-zA-Z0-9]*$/)
    .messages({
      "string.required": "Password is required",
      "string.min": "Password should have minimum 5 Character",
      "string.max": "Password should not exceed 10 Characters",
      "string.empty": "Task cannot be empty",
    }),
});
