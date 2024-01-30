import { checkToken } from "../servicing/authService.js";
import { getResponseTemplate } from "../lib/getResponseTemplate.js";

export function authenticate(access = false) {
    return async (req, res, next) => {
        try{
            let message;
            const bearer = req.headers.authorization || '';
            const token = bearer.split(' ')[1];
            const user = await checkToken(token); // возвр. объект с информацией о пользователе
            
            if(user) { // токен есть, актуальный, user найден
                req.body = {...req.body, forUser: user}; // доп.
                if(access) { // доступ к действиям, для админа
                    
                    if(user.status === 'admin') { // пользователь является админом, проверка обязательна
                        next();
                        return
                    }

                    message = "403 Forbidden";
                    const response = getResponseTemplate(null, message);
                    return res.status(403).send(response);
                }else {
                    next();
                    return;
                }
            }

            message = "401 Unauthorized";
            const response = getResponseTemplate(null, message);
            return res.status(401).send(response);
        }catch(err) {
            const message = "500 Server Error";
            const response = getResponseTemplate(null, message);
            return res.status(500).send(response);
        }
    }
}