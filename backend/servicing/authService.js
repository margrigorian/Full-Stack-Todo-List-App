import { getUser, addUser } from '../sqlDB/slices/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../lib/config.js';

export async function checkUser(email, password) { 
    const user = await getUser(email); // проверка наличия юзера с таким email, возращ. объект c пользователем
    let areSame = undefined;

    if(user) { 
        areSame = await bcrypt.compare(password, user.password); // проверка соответствия пароля
    }

    if(user && areSame) {
        return user;
    }else {
        return null;
    }
}

export async function addNewUser(name, email, password) {
    const hashpassword = await bcrypt.hash(password, 10); // хеширование пароля
    const newUser = await addUser(name, email, hashpassword); // объект с новым пользователем
    return newUser;
}

export function getToken(email) {
    const payload = {
        email
    }

    const token = jwt.sign(payload, secret, {expiresIn: '12h'});
    return token;
}

export async function checkToken(token) {
    try{
        const decodedToken = jwt.verify(token, secret); // при ошибке пробрасывает throw
        const user = await getUser(decodedToken.email); // проверка наличия юзера с таким email, возращ. объект c пользователем
        
        if(user) { // пользователь найден
            return user;
        }else {
            return null;
        }
    }catch(err) {
        // console.log(err);
        return null; // в случае ошибки jwt.verify
    }
}