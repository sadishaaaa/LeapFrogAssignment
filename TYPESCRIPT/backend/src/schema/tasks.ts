import Joi from "joi";
export const TaskSchema = Joi.object({
  task: Joi.string().required().max(255).messages({
    "string.required": "Task is required",
    "string.empty": "Task cannot be empty",
    "string.max": `Task must not exceed 255 characters`
  }),
});
