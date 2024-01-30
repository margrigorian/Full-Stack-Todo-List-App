import { getResponseTemplate } from "../lib/getResponseTemplate.js";
import { 
    getCurrentExpedition, 
    getExpeditionsOfCurrentUser, 
    postNewExpedition,
    updateExpedition ,
    deleteExpedition
} from "../sqlDB/slices/expeditions.js";

export async function getUserExpeditionsController(req, res) {
    try{
        const { userId } = req.params; // string
        const { forUser} = req.body// объект user из body, добавлено в authenticate
        
        if(+userId === forUser.id) { // дополнительная проверка
            const data = await getExpeditionsOfCurrentUser(+userId);
            const response = getResponseTemplate(data, null);
            return res.status(200).send(response);
        }

        const message = '404 Not Found';
        const response = getResponseTemplate(null, message);
        return res.status(404).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function postUserExpeditionController(req, res) {
    try {
        const { userId } = req.params; // string
        const { title } = req.body;
        const newExpedition = await postNewExpedition(+userId, title);
        const response = getResponseTemplate(newExpedition, null);
        return res.status(201).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function putUserExpeditionController(req, res) {
    try{
        const { id } = req.body; // id поста
        const expedition = getCurrentExpedition(id); // проверка на наличие этого поста

        if(expedition) { // пост существует, обновляем
            const updatedExpedition = await updateExpedition(req.body);
            const response = getResponseTemplate(updatedExpedition, null);
            return res.status(201).send(response);
        }

        // пост не был найден
        const message = "404 Not Found";
        const response = getResponseTemplate(null, message);
        return res.status(404).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function deleteUserExpeditionsController(req, res) {
    try{
        const { expeditionId } = req.query; // id удаляемого поста, str
        const deletedExpedition = await getCurrentExpedition(+expeditionId); // проверка на наличие этого поста
    
        if(deletedExpedition) {
            await deleteExpedition(+expeditionId);
            const response = getResponseTemplate(deletedExpedition, null);
            return res.status(200).send(response);
        }
    
        const message = "404 Not Found";
        const response = getResponseTemplate(null, message);
        return res.status(404).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}