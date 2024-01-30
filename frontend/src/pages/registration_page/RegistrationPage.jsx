import React, { useState }  from 'react';
import style from "./RegistrationPage.module.css";
import { NavLink } from 'react-router-dom';
import { makeRegistration } from '../../lib/request';

export default function RegistrationPage(prop) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successAuthorizationAlert, setSuccessAuthorizationAlert] = useState('');
    const [error, setError] = useState('');

    async function register() {
        if(name && email && password) {
            const serverAnswer = await makeRegistration({name, email, password});
            if(serverAnswer.error) {
                setError(serverAnswer.error);
            }else {
                setSuccessAuthorizationAlert(serverAnswer.data.message);
            }
            // prop.setAuthorizationAlert(serverAnswer.message);
            // prop.setUserId(serverAnswer.userId);
        }

        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className={style.container}>
            <div className={style.modalFon}>
                <div className={style.modalWindow}>
                    {
                        successAuthorizationAlert ?
                            <div className={style.authorizationAlert}>
                                <div>{successAuthorizationAlert}</div>
                                <NavLink to={'/'}>
                                    <button className={style.returnButton}>RETURN</button>
                                </NavLink>
                            </div>
                                :
        
                            <div className={style.registrationContainer}>
                                {
                                    error ? <div className={style.errorAlert}>{error}</div> : undefined
                                }
                                <input 
                                    type='text' 
                                    name="name"
                                    onChange={(e) => {
                                        setError('');
                                        setName(e.target.value);
                                    }}
                                    className={style.registrationInput}
                                    placeholder='Name'
                                ></input>
                                <input 
                                    type='text' 
                                    name="email"
                                    onChange={(e) => {
                                        setError('');
                                        setEmail(e.target.value);
                                    }}
                                    className={style.registrationInput}
                                    placeholder='E-mail'
                                ></input>
                                <input 
                                    type='password' 
                                    name="password"
                                    onChange={(e) => {
                                        setError('');
                                        setPassword(e.target.value);
                                    }}
                                    className={style.registrationInput}
                                    placeholder='Passward'
                                ></input>
                                <button 
                                    className={style.createAccountButton}
                                    onClick={() => {
                                        register();
                                    }}
                                >
                                    CREATE ACCOUNT
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
