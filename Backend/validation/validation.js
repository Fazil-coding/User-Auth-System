const zod = require("zod");

const signupSchema = zod.object({
  FirstName: zod.string().min(1, "First Name is required"),
  EmailId: zod.string().email("Invalid email"),
  Password: zod.string().min(8, "Password must be at least 8 characters"),
});

const signinSchema = zod.object({
  EmailId: zod.string().email("Invalid email"),
  Password: zod.string().min(8, "Password must be at least 8 characters"),
});

module.exports = {
  signinSchema,
  signupSchema,
};
