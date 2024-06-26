"use server";

import { LoginSchema } from "@/types/schemas";

export async function submitLogin({

}){
    const parse=LoginSchema.safeParse({
        
    });
}