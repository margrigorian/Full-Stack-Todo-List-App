import React from 'react';
import style from "./StartPage.module.css";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/login_form/LoginForm';

export default function StartPage(prop) {
  const [authorizationAlert, setAuthorizationAlert] = useState('');

  return (
    <div className={style.container}>
      <LoginForm 
        authorizationAlert={authorizationAlert} 
        setAuthorizationAlert={setAuthorizationAlert} 
        setUser={prop.setUser}
      />
      <div className={style.navlinkContainer}>
        <NavLink to={prop.user ? `/expeditions/user/${prop.user.id}` : undefined}>
            <button className={style.button}>YOUR EXPEDITIONS LIST</button>
        </NavLink>
        <NavLink to={prop.user ? "/expeditions" : undefined}>
            <button className={style.button}>ALL USERS EXPEDITIONS</button>
        </NavLink>
      </div>
    </div>
  )
}
