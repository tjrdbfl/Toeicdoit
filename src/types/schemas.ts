import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "유효한 이메일 형식이 아닙니다." 
    }).min(1,{
        message: "이메일은 필수 항목입니다."
    }),
    password: z.string().min(8,{
        message: "비밀번호는 8자리 이상이어야 합니다. ",
    }).refine(password => {
        if (password.length < 8) {
            return true; 
        }
        const hasUpperCase=/[A-Z]/.test(password);
        const hasLowerCase=/[a-z]/.test(password);
        const hasNumber=/[0-9]/.test(password);
        const hasSpecialChar=/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    },{
        message:'유효한 비밀번호 형식이 아닙니다.(비밀번호에 최소 1개 이상의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.)'
    })
})

export const ModifyPasswordSchema = z.object({
    //email: z.string(),
    email: z.string().email({
        message: "유효한 이메일 형식이 아닙니다." 
    }).min(1,{
        message: "이메일은 필수 항목입니다."
    }),
    //password: z.string(),
    password: z.string().min(8,{
        message: "비밀번호는 필수 항목입니다. ",
    }).refine(password => {
        if (password.length < 8) {
            return true; 
        }
        const hasUpperCase=/[A-Z]/.test(password);
        const hasLowerCase=/[a-z]/.test(password);
        const hasNumber=/[0-9]/.test(password);
        const hasSpecialChar=/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    },{
        message:'유효한 비밀번호 형식이 아닙니다.'
    }),
    newPassword: z.string()
    // password: z.string().min(8,{
    //     message: "비밀번호는 필수 항목입니다. ",
    // }).refine(password => {
    //     if (password.length < 8) {
    //         return true; 
    //     }
    //     const hasUpperCase=/[A-Z]/.test(password);
    //     const hasLowerCase=/[a-z]/.test(password);
    //     const hasNumber=/[0-9]/.test(password);
    //     const hasSpecialChar=/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(password);
    //     return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    // },{
    //     message:'유효한 비밀번호 형식이 아닙니다.'
    // }),
})

export const RegisterSchema = z.object({
    // email: z.string(),
    // password: z.string(),
    // name: z.string(),
    // phone: z.string(),
    email: z.string().email({
        message: "유효한 이메일 형식이 아닙니다. " 
    }).min(1,{
        message: "이메일은 필수 항목입니다."
    }),
    password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
        .max(32, { message: "비밀번호는 최대 32자까지 가능합니다." })
        .refine((password) => {
            if (password.length < 8) {
                return true;
            }
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(password);
            return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
        }, {
            message: '비밀번호는 최소 하나의 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.'
        }),
    name: z
    .string()
    .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
    .max(5, { message: "이름은 최대 5자까지 가능합니다." }),
    phone: z
    .string()
    .min(1,{message:'필수 항목입니다.'})
    .regex(/^010\d{7,8}$/, { message: "유효한 휴대폰 번호 형식이 아닙니다. (예: 01012345678)" })

})
export const ModifyUserInfoSchema=z.object({
    name: z
    .string()
    .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
    .max(5, { message: "이름은 최대 5자까지 가능합니다." }),
    phone: z
    .string()
    .min(1,{message:'필수 항목입니다.'})
    .regex(/^010\d{7,8}$/, { message: "유효한 휴대폰 번호 형식이 아닙니다. (예: 01012345678)" })
});

export const FreeSaveSchema = z.object({
    category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
    title: z.string().min(8, { message: "최소 8자리 이상 입력해주세요." }),
    content: z.string().min(50, { message: "최소 50자리 이상 입력해주세요." }).max(1000, { message: "최대 1000자까지 입력 가능합니다." }),
    type: z.string().min(1).optional(),
})

export const FreeReplySchema = z.object({
    writerName: z.string().min(1),
    content: z.string({
        message: "최대 1000자까지 입력 가능합니다."
    }).min(1).max(100),
})