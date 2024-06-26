import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "이메일은 필수 항목입니다."
    }),
    password: z.string().refine(password => password.length >= 8, {
        message: "Password must be at least 8 characters long",
        path: ['password'], // indicates this error is about the password field
      })
})

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&*\(\)\[\]\{\}\-_=\+:;'"<,./?])[a-zA-Z0-9!@#\$%\^&*\(\)\[\]\{\}\-_=\+:;'"<,./?]{8,}$/;
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "이메일은 필수 항목입니다."
    }),
    password: z.string().min(8, { message: "비밀번호는 최소 8자입니다." })
        .regex(passwordRegex, {
            message:
                "비밀번호는 최소 하나 이상의 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.",
        }),
    name: z.string(),
    phone:z.string(),
    job:z.string().optional()
})

export const PostWriteSchema=z.object({
    category:z.string().min(1),
    title:z.string({
        message:"최소 8자리 이상 입력해주세요."
    }).min(8),
    content:z.string({
        message:"최대 1000자까지 입력 가능합니다."
    }).min(1).max(1000),
})

export const PostReplySchema=z.object({
    writer:z.string().min(1),
    content:z.string({
        message:"최대 1000자까지 입력 가능합니다."
    }).min(1).max(100),
})