import { getResponseTemplate } from "../lib/getResponseTemplate.js";
import { checkUser, addNewUser, getToken } from "../servicing/authService.js";

export async function registrationController(req, res) {
    try{
        let message;

        const {name, email, password} = req.body;
        const user = await checkUser(email, password); 
    
        if(user === null) {  // нет такого пользователя еще, добавляем
            const newUser = await addNewUser(name, email, password);
            message = "Successful registration! Please login" // для получения токена и дальнейших действий
            const response = getResponseTemplate({data: newUser, message}, null);
            return res.status(201).send(response);
        }
    
        message = "User login already exists";
        const response = getResponseTemplate(null, message);
        return res.status(406).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function loginController(req, res) {
    try{
        let message;

        const {email, password} = req.body;
        const user = await checkUser(email, password);
        if(user) { // авторизация прошла, выдаем токен
            const token = getToken(user.email);
            message = "Successful authorization! You can open expeditions list";
            const response = getResponseTemplate({data: {...user, token}, message}, null);
            return res.status(201).send(response);
        }
    
        message = "The user's email address or passward is invalid";
        const response = getResponseTemplate(null, message);
        return res.status(406).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}