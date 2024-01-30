import React, { useEffect, useState } from 'react';
import style from './AllExpeditionsPage.module.css';  
import { getAllExpeditionsList, updateExpedition, deleteExpeditionFromData } from '../../lib/request';  
import ModalWindow from '../../components/modal_window/ModalWindow';

export default function AllExpeditionsPage(prop) {
    const [expeditions, setExpeditions] = useState([]);
    const [page, setPage] = useState(1); // для request
    const [limit, setLimit] = useState(3); // для request
    const [pageNumbers, setPageNumbers] = useState([1]);
    const [action, setAction] = useState('getData');
    const [modalWindow, setModalWindow] = useState(false);
    const [expeditionID, setExpeditionID] = useState(null);
    const [redactedTitle, setRedactedTitle] = useState('');

    useEffect(() => {
        if(action === 'getData') {
            setAction(null);

            getAllExpeditionsList(prop.user.token, page, limit).then(arr => {
                if(arr.limitExpeditions) {
                    // для пагинации
                    const quentityOfPages = Math.ceil(arr.totalExpeditionsNumber / limit);
                    let numbersArr = [];
                    for(let i = 1; i <= quentityOfPages; i++) {
                        numbersArr.push(i);
                    }
                    
                    setPageNumbers(numbersArr);
                    setExpeditions(arr.limitExpeditions);
                }
            }).catch(err => console.log(err));
        }else if(action === 'changeTitle') {
            changeExpeditionInfo();
        }else if (action === 'deleteExpedition') {
            deleteExpedition();
        }
    }, [expeditions, action])

    async function changeExpeditionInfo() {
        setAction(null);
        
        if(redactedTitle) {
            // обновление страницы через front
            expeditions.map(el => {
                if(el.id === expeditionID) {
                    el.title = redactedTitle;
                    return el;
                }else {
                    return el;
                }
            })

            const expedition = expeditions.find(el => el.id === expeditionID);
            await updateExpedition(prop.user.userId, prop.user.token, expedition);
            setRedactedTitle("");
        }

        setExpeditionID(null);
    }

    async function deleteExpedition() {
        setAction(null); // иначе происходит зацикленность
        await deleteExpeditionFromData(prop.user.id, prop.user.token, expeditionID);

        setExpeditionID(null);
        // обновление страницы через back
        setPage(page - 1);
        setAction('getData');
    }


    return (
        <div className={style.fon}>
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
            <div className={style.headerContainer}>
                <p className={style.headerText}>ALL EXPEDITIONS</p>
                <div className={style.pagination}>
                    {
                        pageNumbers.map(el => 
                            <div 
                                key={`id-${Math.random()}`}
                                className={style.page}
                                onClick={() => {
                                    setPage(el);
                                    setAction('getData');
                                }}
                            >
                                {el}
                            </div>
                        )
                    }
                </div>
            </div>
            {
                expeditions.length > 0 ? 
                    <div className={style.container}>
                        <div className={style.expeditionsContainer}>
                            {
                                expeditions.map(el => 
                                    prop.user.status !== 'admin' ? 
                                        <div key={`ExpeditionID-${Math.random()}`} className={style.expedition}>
                                            <div className={style.title}>{el.title}</div>
                                            <button className={style.button}>READ</button>
                                        </div>
                                            :
                                        <div key={`ExpeditionID-${Math.random()}`} className={style.expedition}>
                                            <div className={style.expeditionsHeaderContainer}>
                                                <div className={style.title}>{el.title}</div>
                                                <div className={style.iconContainer}>
                                                    <div 
                                                        className={style.editIcon}
                                                        onClick={() => {
                                                            setExpeditionID(el.id);
                                                            setModalWindow(!modalWindow);
                                                        }}
                                                    ></div>
                                                    <div 
                                                        className={style.basket}
                                                        onClick={() => {
                                                            setExpeditionID(el.id);
                                                            setAction('deleteExpedition');
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className={style.button}>READ</button>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                        : 
                    <div className={style.loading}>There aren't expeditions</div>
            }
        </div>
    )
}
