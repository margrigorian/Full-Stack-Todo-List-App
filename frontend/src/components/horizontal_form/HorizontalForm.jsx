import React from 'react';
import style from './HorizontalForm.module.css';

export default function HorizontalForm(prop) {
  return (
    <div className={style.addExpeditionContainer}>
        <p className={style.textAddExpedition}>NEW EXPEDITION</p>
        <input 
            type='text' 
            name="title"
            value={prop.newTitle}
            onChange={(e) => {
                prop.setNewTitle(e.target.value);
            }}
            className={style.addExpeditionInput}
            placeholder='Title...'
        ></input>
        <button 
            className={style.addExpeditionButton}
            onClick={() => {
                prop.setAction('createExpedition');
            }}
        >
            ADD TO LIST
        </button>
    </div>
  )
}
