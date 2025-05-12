import {z} from "zod";

export const registerSchema = z.object({
    username : z.string({
        required_error:'El nombre de usuario es obligatorio'
    }),
    email: z.string({
        required_error:'El email es obligatorio'
    }).email({
        message: "El email no es válido"
    }),

    password: z.string({
        required_error:'La contraseña es obligatoria'
    }).min(4, {
        message: "La contraseña debe tener al menos 4 caracteres"
    })
})


export const loginSchema = z.object({
    email: z.string({
        required_error:"El email es obligatorio",
    }).email({
        message:"El email no es válido",
    }),
    
    password : z.string({
        required_error:"La contraseña es obligatoria",
    }).min(4,{
        message:"La contraseña debe tener al menos 4 caracteres",
    }),
});