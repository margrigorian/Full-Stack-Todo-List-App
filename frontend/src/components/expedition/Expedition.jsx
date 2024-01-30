import React from 'react';
import style from './Expedition.module.css';

export default function Expedition(prop) {
  return (
    <div className={style.expedition}>
        <div className={style.editContainer}>
            <div className={style.title}>{prop.el.title}</div>
            <div 
                className={style.editIcon}
                onClick={() => {
                    prop.setModalWindow(!prop.modalWindow);
                    prop.setExpeditionID(prop.el.id);
                }}
            ></div>
        </div>
        <div className={style.checkboxContainer}>
            Completed 
            <input 
                type="checkbox" 
                // value={}
                checked={prop.el.status ? true : false} // чтобы отмеченное всегда отображалось
                onChange={() => {
                    prop.setExpeditionID(prop.el.id);
                    prop.setAction('changeStatus');
                }}
                className={style.checkbox}
            >
            </input>
            <div 
                className={style.basket}
                onClick={() => {
                    prop.setExpeditionID(prop.el.id);
                    prop.setAction('deleteExpedition')
                }}
            ></div>
        </div>
    </div> 
  )
}
