import Joi from "joi";
export const TaskSchema = Joi.object({
  task: Joi.string().required().max(255).messages({
    "string.base": "Task is required",
  }),
});
