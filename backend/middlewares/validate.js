import z from "zod";
import { getResponseTemplate } from "../lib/getResponseTemplate.js";

export const validate = (action) => {
    return async (req, res, next) => {
        
        const schemas = {
            registration: z.object({
                name: z.string().min(1),
                email: z.string().email(),
                password: z.string().min(3)
            }),
            authorization: z.object({
                email: z.string().email(),
                password: z.string().min(3)
            }),
            post: z.object({
                title: z.string().min(1)
            }),
            put: z.object({
                id: z.number(),
                title: z.string().min(1),
                status: z.boolean(),
                userId: z.number()
            })  
        };

        const validatedAction = schemas[action].safeParse(req.body);       
        if(validatedAction.success) {
            next();
            return;
        }
        
        const message = "The sent data is incorrect";
        res.status(406).send(getResponseTemplate(null, message));
        return;
    }
}