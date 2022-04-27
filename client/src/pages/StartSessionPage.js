//подключаем нужные библиотеки
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/context'
//подключаем красоту
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes4 from "../style/MyContact.module.css"
import classes5 from "../style/MyForm.module.css"
import classes6 from "../style/MyInput.module.css"
import classes7 from "../style/MyButton.module.css"
import classes8 from "../style/MyInputRange.module.css"
//поключаем логотип и кнопку назад
import logo from "../image/1.jpg"
import logo2 from "../image/6.png"
//подключаем функцию для запросов
import { useHttp } from '../hooks/httpRequest'


export const StartSessionPage = () => {
    //для перхода по страницам
    const navigate = useNavigate()
    //для фиксирования данных
    //const [time, setTime] = useState('0')
    const [valueName, setValueName] = useState('')
    const [valueDate, setValueDate] = useState('')
    const [buttonName, setButtonName] = useState('ПРОДОЛЖИТЬ')
    const { idPacient, namePacient, setIdPacient, setNamePacient, time, setTime } = useContext(AuthContext)

    const { request } = useHttp()
    const [Data, setData] = useState([])

    //для запроса фамилий пациентов
    const fetchPAS = useCallback(async () => {
        try {
            const data = await request('/api/pacient/allPacient', 'POST', { number: 0 })
            if (data.status === 200) {
                setData(data.data)
            } else {
            }
        } catch (e) { }
    }, [request])

    useEffect(() => {//чтобы один раз, а не постоянно
        fetchPAS()
    }, [fetchPAS])

    //для возвращения назад
    const back = (e) => {
        e.preventDefault()
        if ((idPacient !== 0) && (namePacient !== '')) {
            setIdPacient(0)
            setNamePacient('')
            //setTime(Number())
            navigate(`/pacient/${idPacient}`)
        } else {
            navigate('/main')
        }
    }

    //проверка данных для продолжения
    const cont = (e) => {
        e.preventDefault()

        if (time === '0') {
            setButtonName("ВРЕМЯ НЕ ВВЕДЕНО")

        } else {

            if ((idPacient === 0) && (namePacient === '')) {

                let er = 0;
                Data.map((pacient) => {
                    if (pacient.fio === valueName) {
                        er = 1;
                        setIdPacient(pacient.id)
                        setNamePacient(pacient.fio)
                    }
                })
                if (er === 0) {
                    setButtonName("НЕТ ТАКОГО ПАЦИЕНТА")
                } else {
                    navigate('/countsession')
                }
            } else {
                setIdPacient(idPacient)
                setNamePacient(namePacient)
                navigate('/countsession')
            }
        }
    }


    //для установки сегодняшней даты
    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });
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
                        <div onClick={back} style={{ border: "none" }} className={classes1.header__logo}>
                            <img src={logo2} alt="" />
                        </div>
                    </div>
                </div>
            </header >
            <div className={classes3.myMain}>
                <div className={classes2.myContainer}>
                    <form className={classes5.formLoginPage}>
                        <div className={classes6.myInput__div}>
                            <div>ВВЕДИТЕ ИНФОРМАЦИЮ</div>
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Пациент:</div>
                            <input placeholder={namePacient} list={"character"} onClick={e => { setButtonName("ПРОДОЛЖИТЬ") }} onChange={e => setValueName(e.target.value)} className={classes6.myInput} type={"text"} size="50" />
                            <datalist id={"character"}>
                                {
                                    Data.map((pacient) =>
                                        <option key={pacient.id} value={pacient.fio}></option>)
                                }
                            </datalist>
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Дата сеанса:</div>
                            <input onChange={e => setValueDate(e.target.value)} className={classes6.myInput} type={"date"} value={new Date().toDateInputValue()} size="50" />
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Время сеанса:</div>
                            <div>{time} мин.</div>
                            <input onChange={e => { setTime(Number(e.target.value)); setButtonName("ПРОДОЛЖИТЬ") }} className={classes8.myInputRange} type={"range"} min={"1"} max={"60"} step={"1"} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", padding: "5px" }} >
                            <button onClick={cont} className={classes7.myButton}>{buttonName}</button>
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
        </div>
    )
}