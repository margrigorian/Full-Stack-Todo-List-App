import React from 'react';
import style from './VerticalForm.module.css';

export default function VerticalForm(prop) {
  return (
    <div className={style.createExpeditionContainer}>
        <p className={style.textMakeExpedition}>MAKE NEW EXPEDITION</p>
        <input 
            type='text' 
            name="title"
            onChange={(e) => {
                prop.setNewTitle(e.target.value);
            }}
            className={style.createExpeditionInput}
            placeholder='Title...'
        ></input>
        <button 
            className={style.createExpeditionButton}
            onClick={() => {
                prop.setAction('createExpedition');
            }}
        >
            CREATE EXPEDITION
        </button>
    </div>
  )
}
