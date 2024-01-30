import db from '../db.js';

export async function getExpeditionsFromData(page, limit) {
    let responseObj = {
        totalExpeditionsNumber: null, // общее количество экспедиций для выстраивания пагинации
        limitExpeditions: null // конкретно запрошенные todo
    }

    const number = await db.query('SELECT id FROM expeditions_list ORDER BY id DESC LIMIT 1');
    let expeditions = await db.query('SELECT * FROM expeditions_list LIMIT ?, ?', [(page - 1) * limit, limit]);

    expeditions = expeditions[0].map(el => changeStatusToBoolean(el));

    responseObj.totalExpeditionsNumber = number[0][0].id;
    responseObj.limitExpeditions = expeditions;
    
    return responseObj;
}

export async function getExpeditionsOfCurrentUser(userId) {
    let expeditions = await db.query(`SELECT * FROM expeditions_list WHERE userId = '${userId}'`);
    expeditions = expeditions[0].map(el => changeStatusToBoolean(el));
    return expeditions;
}

export async function postNewExpedition(userId, title) {
    const newId = await getLastExpeditionsId() + 1;
    await db.query(`INSERT INTO expeditions_list(id, title, status, userId) VALUES('${newId}', '${title}', 0, '${userId}')`)
    
    return await getCurrentExpedition(newId);
}

export async function updateExpedition(body) {
    const status = Number(body.status);
    await db.query(`UPDATE expeditions_list SET title='${body.title}', status='${status}' WHERE id='${body.id}'`);

    return await getCurrentExpedition(body.id);
}

export async function deleteExpedition(id) {
    await db.query(`DELETE FROM expeditions_list WHERE id = '${id}'`);
}

async function getLastExpeditionsId() {
    const lastId = await db.query('SELECT id FROM expeditions_list ORDER BY id DESC LIMIT 1');
    return lastId[0][0].id;
}

export async function getCurrentExpedition(id) { 
    let expedition = await db.query(`SELECT * FROM expeditions_list WHERE id='${id}'`);
    expedition = changeStatusToBoolean(expedition[0][0]);
    return expedition;
}

function changeStatusToBoolean(expedition) {
    expedition.status = Boolean(expedition.status);
    return expedition;
}