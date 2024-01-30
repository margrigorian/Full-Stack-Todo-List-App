import { getExpeditionsFromData } from "../sqlDB/slices/expeditions.js";
import { getResponseTemplate } from "../lib/getResponseTemplate.js";

export async function getExpeditionsController(req, res) {
    try{
        let { page, limit} = req.query; // если нет, то undefined
        page = +page;
        limit = +limit;

        if(typeof page === 'number' && typeof limit === 'number') {
            const expeditions = await getExpeditionsFromData(+page, +limit);
            const response = getResponseTemplate(expeditions, null);
            return res.status(200).send(response);
        }

        const message = '400 Bad Request';
        const response = getResponseTemplate(null, message);
        return res.status(400).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}