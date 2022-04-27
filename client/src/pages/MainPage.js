//необходимые библиотеки
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/context'
//импортируем css -сттили (наводим красоту)
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes4 from "../style/MyContact.module.css"
import classes7 from "../style/MyButton.module.css"
//импертируем логотип и кнопку назад
import logo from "../image/1.jpg"
import logo2 from "../image/7.png"

export const MainPage = () => {
    //для перехода к другим страницам
    const navigate = useNavigate()
    //для выхода из личного кабинета
    const { setIsAuth, setIdPacient, setNamePacient, setTime } = useContext(AuthContext)
    //наша страница
    return (
        <div>
            <header className={classes1.myHeader}>
                <div className={classes2.myContainer}>
                    <div className={classes1.header__body}>
                        <a href="https://minzdrav.gov.ru/" className={classes1.header__logo}>
                            <img src={logo} alt="" />
                        </a>
                        <div className={classes1.nameUser}>{localStorage.getItem("user")}</div>
                        <div onClick={e => { localStorage.removeItem("user"); localStorage.removeItem("token"); setIsAuth(false) }} style={{ border: "none" }} className={classes1.header__logo}>
                            <img src={logo2} alt="" />
                        </div>
                    </div>
                </div>
            </header >
            <div className={classes3.myMain}>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "100px" }} className={classes2.myContainerMainPage}>
                    <button onClick={e => { setIdPacient(0); setTime('0'); setNamePacient(''); navigate('/startsession'); }} className={classes7.myButtonMainPage}>НАЧАТЬ СЕАНС</button>
                    <button onClick={e => navigate('/pacient')} className={classes7.myButtonMainPage}>КАРТЫ ПАЦИЕНТОВ</button>
                    <button onClick={e => navigate('/manual')} className={classes7.myButtonMainPage}>СПРАВКА</button>
                </div>
            </div>
            <div className={classes4.myContact}>
                <div className={classes2.myContainer}>
                    <div className={classes4.contact__body}>
                        <nav className={classes4.contact__menu}>
                            <li>
                                8 495 627-24-00
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}