import React from 'react';
import style from './ModalWindow.module.css';

export default function ModalWindow(prop) {
  return (
    <div 
        className={style.modalFon}
        onClick={() => {
            prop.setModalWindow(!prop.modalWindow);
            prop.setAction(null);
            prop.setExpeditionID(null);
        }}
    >
        <div 
            className={style.modalWindow}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <input 
                type='text' 
                name="title"
                onChange={(e) => {
                    prop.setRedactedTitle(e.target.value);
                }}
                className={style.editTitleInput}
                placeholder='Title...'
            ></input>
            <button 
                className={style.changeTitleButton}
                onClick={() => {
                    prop.setModalWindow(!prop.modalWindow);
                    prop.setAction('changeTitle');
                }}
            >
                CHANGE TITLE
            </button>
        </div>
    </div>
  )
}
