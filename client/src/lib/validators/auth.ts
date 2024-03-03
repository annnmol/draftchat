import { z, ZodTypeAny } from "zod";

//============= Sign IN =============
export const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSignInValidator = z.infer<typeof SignInValidator>;

export const signInIntialValues = {
  email: "anmol@a.com",
  password: "123456",
};

//============= Sign UP =============
export const SignUpValidator = z.object({
  fullName: z.string(),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSignUpValidator = z.infer<typeof SignUpValidator>;

export const signUpIntialValues = {
  fullName: "Anmol",
  username: "anmol",
  email: "a@a.com",
  password: "123456",
};

//============= Forget Password =============
export const ForgetPasswordValidator = z.object({
  email: z.string().email(),
});

export type TForgetPasswordValidator = z.infer<typeof ForgetPasswordValidator>;

export const forgetPasswordIntialValues = {
  email: "",
};

//============= Change Password =============
export const ChangePasswordValidator = z
  .object({
    password: z.string().min(6),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"], // path of error
  });

export type TChangePasswordValidator = z.infer<typeof ChangePasswordValidator>;

export const changePasswordIntialValues = {
  password: "",
  confirm: "",
};


//============= Email =============

export const emailSchema = z.string().email();
