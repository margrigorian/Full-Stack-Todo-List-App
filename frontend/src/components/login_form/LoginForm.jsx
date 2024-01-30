import React from 'react';
import style from "./LoginForm.module.css";
import { useState } from 'react';
import { makeAuthorization } from '../../lib/request';
import { NavLink } from 'react-router-dom';

export default function LoginForm(prop) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        if(email && password) {
            const serverAnswer = await makeAuthorization({email, password});
            if(serverAnswer.data) {
              prop.setAuthorizationAlert(serverAnswer.data.message);
              prop.setUser(serverAnswer.data.data);
            }else {
              prop.setAuthorizationAlert(serverAnswer.error); // при наличии ошибки
            }
        }

        setEmail("");
        setPassword("");
    }

  return (
    <div className={style.loginContainer}>
        <div>
          <input
            name="email"
            type='text' 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={style.loginInput}
            placeholder='E-mail'
          ></input>
          <input
            id="userPassword"
            type='password' 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={style.loginInput}
            placeholder='Password'
          ></input>
        </div>
        <div>
            <button 
                className={style.loginButton}
                onClick={() => {
                    login();
                }}
            >
                LOG IN
            </button>
            <NavLink to={"/register"}>
              <button 
                  className={style.loginButton}
              >
                  SIGN UP
              </button>
            </NavLink>
        </div>
        {
            prop.authorizationAlert ? 
            <div className={style.authorizationAlert}>{prop.authorizationAlert}</div> : undefined
        }
      </div>
  )
}
