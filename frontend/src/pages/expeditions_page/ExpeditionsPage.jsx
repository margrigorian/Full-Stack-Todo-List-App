import React from 'react';
import style from './ExpeditionsPage.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUserExpeditionsList, 
            postNewExpedition, 
            updateExpedition, 
            deleteExpeditionFromData } from '../../lib/request';
import ModalWindow from '../../components/modal_window/ModalWindow';
import Expedition from '../../components/expedition/Expedition';
import HorizontalForm from '../../components/horizontal_form/HorizontalForm';
import VerticalForm from '../../components/vertical_form/VerticalForm';

export default function ExpeditionsPage(prop) {
    const { userId } = useParams(); // id пользователя
    const [expeditions, setExpeditions] = useState([]);
    const [expeditionID, setExpeditionID] = useState(null);
    const [error, setError] = useState(null);
    const [action, setAction] = useState('getData');
    const [newTitle, setNewTitle] = useState('');
    const [redactedTitle, setRedactedTitle] = useState('');
    const [modalWindow, setModalWindow] = useState(false);

    useEffect(() => {
        if(action === 'getData') {
            setAction(null);

            getCurrentUserExpeditionsList(userId, prop.user.token).then(arr => {
                if(arr.message) { // если пришла ошибка
                    setError(arr.message);
                }else {
                    setExpeditions(arr);
                }
            });
        }else if(action === 'createExpedition') {
            createExpedition();
        }else if(action === 'changeTitle' || action === 'changeStatus') {
            changeExpeditionInfo(action);
        }else if (action === 'deleteExpedition') {
            deleteExpedition();
        }
    }, [expeditions, action])

    async function createExpedition() {
        await postNewExpedition(userId, prop.user.token, newTitle);
        setNewTitle('');
        // обновление страницы через back
        setAction('getData');
    }

    async function changeExpeditionInfo() {
        setAction(null);
        
        if(action === 'changeTitle') {
            // обновление страницы через front
            if(redactedTitle) {
                expeditions.map(el => {
                    if(el.id === expeditionID) {
                        el.title = redactedTitle;
                        return el;
                    }else {
                        return el;
                    }
                })

                const expedition = expeditions.find(el => el.id === expeditionID);
                await updateExpedition(userId, prop.user.token, expedition);
                setRedactedTitle("");
            }
        }else {
            expeditions.map(el => {
                // обновление страницы через front
                if(el.id === expeditionID) {
                    el.status = !el.status
                    return el;
                }else {
                    return el;
                }
            })

            const expedition = expeditions.find(el => el.id === expeditionID);
            await updateExpedition(userId, prop.user.token, expedition);
        }

        setExpeditionID(null);
    }

    async function deleteExpedition() {
        setAction(null); // иначе происходит зацикленность

        // обновление страницы через front
        const updatedExpeditions = expeditions.filter(el => el.id !== expeditionID);
        setExpeditions(updatedExpeditions);
        await deleteExpeditionFromData(userId, prop.user.token, expeditionID);

        setExpeditionID(null);
    }


  return (
    <div className={style.fon}>
        <div className={style.lightFon}>
            {
                modalWindow ? 
                    <ModalWindow 
                        modalWindow={modalWindow}
                        setModalWindow={setModalWindow}
                        setExpeditionID={setExpeditionID}
                        setRedactedTitle={setRedactedTitle}
                        setAction={setAction}
                    /> : undefined
            }
            <p className={style.headerText}>EXPEDITIONS</p>
            {
                error ? 
                    <div className={style.errorText}>{error}</div>
                        :
                            expeditions.length ? 
                                <div className={style.container}>
                                    <div className={style.expeditionsContainer}>
                                        {
                                            expeditions.map(el => 
                                                <Expedition 
                                                    key={`ExpeditionID-${el.id}`} 
                                                    el={el}
                                                    modalWindow={modalWindow}
                                                    setModalWindow={setModalWindow}
                                                    setExpeditionID={setExpeditionID}
                                                    setAction={setAction}
                                                />   
                                            )
                                        }
                                    </div> 
                                        
                                    <HorizontalForm 
                                        newTitle={newTitle}
                                        setNewTitle={setNewTitle}
                                        setAction={setAction}
                                    />
                                </div>
                            : 
                                <div className={style.createContainer}>
                                    <VerticalForm 
                                        setNewTitle={setNewTitle}
                                        setAction={setAction}
                                    />
                                </div>
                
            }
        </div>
    </div>
  )
}
