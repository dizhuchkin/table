import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/context'
//импортируем css -сттили (наводим красоту)
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes4 from "../style/MyContact.module.css"
import classes5 from "../style/MyForm.module.css"
import classes6 from "../style/MyInput.module.css"
import classes7 from "../style/MyButton.module.css"
import classes8 from "../style/MyLoader.module.css"
//импортируем логотип
import logo from "../image/1.jpg"
//импортируем функцию для работы с запросами на сервер
import { useHttp } from '../hooks/httpRequest'

export const AuthorizationPage = () => {
    //для того чтобы брать значения логина, пароля 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    //для оаботы с запросами
    const { loading, request } = useHttp()
    const [isRead, setIsRead] = useState(false)
    const [Data, setData] = useState('')
    const [Error, setIsError] = useState(false)
    const [fio, setFio] = useState('')
    const [token, setToken] = useState('')
    const { setIsAuth } = useContext(AuthContext)

    //определяем прочитал ли пользователь уведомление
    const changeRead = (e) => {
        e.preventDefault()
        if (isRead) {
            setIsRead(false)
        }
        else {
            setIsRead(true)
        }

        if (Error !== true) {
            localStorage.setItem("user", `${fio}`);
            localStorage.setItem("token", `${token}`)
            setIsAuth(true)
        }
        setIsError(false)
    }
    //отправка запроса на вход 
    const enter = async (e) => {
        e.preventDefault()
        setIsRead(true)
        try {
            const data = await request('/api/authorization/login', 'POST', { login: login, password: password })
            if (data.status === 200) {

                setIsError(false)
                setData(data.message)
                setFio(data.fio)
                setToken(data.token)
            }
            else {
                setIsError(true)
            }
        } catch (e) { }
    }
    //наша страница
    return (
        <div>
            <header className={classes1.myHeader}>
                <div className={classes2.myContainer}>
                    <div className={classes1.header__body}>
                        <a href="https://minzdrav.gov.ru/" className={classes1.header__logo}>
                            <img src={logo} alt="" />
                        </a>
                    </div>
                </div>
            </header >
            <div style={isRead ? { backgroundColor: "#cdeef6", paddingTop: "150px", display: "flex", justifyContent: "center", zIndex: "1", position: "fixed", top: "0px", left: "0px", width: "100%", height: "100%" } :
                { display: "none" }} className={classes3.myMain}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={loading ? { display: "block" } : { display: "none" }} className={classes8.loader}></div>
                </div>
                <div style={loading ? { display: "none", flexDirection: "column" } : { display: "flex", flexDirection: "column" }}>
                    <div className={classes6.myInput__div}> {Data} </div>
                    <button style={{ margin: "10px" }} onClick={changeRead} className={classes7.myButton}>Окей</button>
                </div>
            </div>
            <div className={classes3.myMain}>
                <div className={classes2.myContainer}>
                    <form className={classes5.formLoginPage}>
                        <div className={classes6.myInput__div}>
                            <div>Вход</div>
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Логин</div>
                            <input onChange={e => { setLogin(e.target.value) }} className={classes6.myInput} type={"text"} size="50" />
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Пароль </div>
                            <input onChange={e => { setPassword(e.target.value) }} className={classes6.myInput} type={"password"} size="50" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", padding: "5px" }} >
                            <button onClick={enter} className={classes7.myButton}>Войти</button>
                        </div>
                    </form>
                </div>
            </div >
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
        </div >
    )
}

