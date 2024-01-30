
async function makeAuthorization(body) {
    try{
        const data = await fetch('http://localhost:3001/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        });

        const authorization = await data.json();
        // console.log(authorization);
        return authorization;
    }catch(err) {
        console.log(err);
    }
}

async function makeRegistration(body) {
    try{
        const data = await fetch('http://localhost:3001/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        });

        const registration = data.json();
        return registration;
    }catch(err) {
        console.log(err);
    }
}

async function getAllExpeditionsList(token, page, limit) {
    try{
        const data = await fetch(`http://localhost:3001/expeditions?page=${page}&limit=${limit}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const expeditions = await data.json();
        return expeditions.data;
    }catch(err) {
        console.log(err);
    }
}

async function getCurrentUserExpeditionsList(userId, token) {
    try{
        const data = await fetch(`http://localhost:3001/expeditions/user/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const expeditions = await data.json();
        
        if(expeditions.error) {
            return expeditions.error; // передает сообщение ошибки
        }

        return expeditions.data; // передает массив todos
    }catch(err) {
        return err;
    }
}

async function postNewExpedition(userId, token, title) {
    try{
        const data = await fetch(`http://localhost:3001/expeditions/user/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({title})
        })

        const newExpedition = await data.json();
        console.log(newExpedition.data);
    }catch(err) {
        console.log(err);
    }
}

async function updateExpedition(userId, token, body) {
    try{
        const data = await fetch(`http://localhost:3001/expeditions/user/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        const modifiedExpedition = await data.json();
        console.log(modifiedExpedition.data);
    }catch(err) {
        console.log(err); 
    }
}

async function deleteExpeditionFromData(userId, token, expeditionId) {
    try{
        await fetch(`http://localhost:3001/expeditions/user/${userId}?expeditionId=${expeditionId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }catch(err) {
        console.log(err);
    }
}

export { 
    makeAuthorization, 
    makeRegistration,
    getAllExpeditionsList,
    getCurrentUserExpeditionsList, 
    postNewExpedition, 
    updateExpedition, 
    deleteExpeditionFromData 
}