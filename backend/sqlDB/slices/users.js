import db from '../db.js';

export async function getUser(email) {
    const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    return user[0][0]; // 0 - выборка, 1 - информация о таблице
}

export async function addUser(name, email, password) {
    const lastId = await getLastUsersId();
    await db.query(`INSERT INTO users(id, name, email, password) VALUES('${lastId + 1}', '${name}', '${email}', '${password}')`);
    return await getUser(email);
}

async function getLastUsersId() {
    const lastId = await db.query('SELECT id FROM users ORDER BY id DESC LIMIT 1');
    return lastId[0][0].id;
}
