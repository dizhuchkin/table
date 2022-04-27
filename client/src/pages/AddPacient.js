//подключаем нужные библиотеки
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask';
//подключаем красоту
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes4 from "../style/MyContact.module.css"
import classes5 from "../style/MyForm.module.css"
import classes6 from "../style/MyInput.module.css"
import classes7 from "../style/MyButton.module.css"
import classes8 from "../style/MyLoader.module.css"
//подключаем функцию для запросов
import { useHttp } from '../hooks/httpRequest'
//поключаем логотип и кнопку назад
import logo from "../image/1.jpg"
import logo2 from "../image/6.png"

export const AddPacient = () => {
    //для перхода на другие страницы
    const navigate = useNavigate()

    //для работы с запросом
    const [isRead, setIsRead] = useState(false)
    const [Error, setIsError] = useState(false)
    const [Data, setData] = useState('')
    const [Data1, setData1] = useState([])
    const { loading, request } = useHttp()
    //для фиксирования онформации о пациенте
    const [fio, setFio] = useState('')
    const [date, setDate] = useState('')
    const [doctor, setDoctor] = useState('')
    const [tel, setTel] = useState('')

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
            navigate('/pacient')
        }
        setIsError(false)
    }
    //отправка запроса на для добавления новго пациента
    const enter = async (e) => {
        e.preventDefault()
        setIsRead(true)
        try {
            const data = await request('/api/pacient/addPacient', 'POST', { fio: fio, date: date, doctor: doctor, tel: tel })
            setData(data.message)
            if (data.status === 200) {
                setIsError(false)
            }
            else {
                setIsError(true)
            }
        } catch (e) { }
    }

    //запрос для получения докторов
    const fetchPAS = useCallback(async () => {
        try {
            const data1 = await request('/api/pacient/allDoctor', 'POST', { number: 0 })
            if (data1.status === 200) {
                setData1(data1.data)
            } else {
            }
        } catch (e) { }
    }, [request])

    useEffect(() => {//чтобы один раз, а не постоянно
        fetchPAS()
    }, [fetchPAS])

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
                        <div onClick={() => navigate('/pacient')} style={{ border: "none" }} className={classes1.header__logo}>
                            <img src={logo2} alt="" />
                        </div>
                    </div>
                </div>
            </header >
            <div style={isRead ? { paddingTop: "150px", display: "flex", justifyContent: "center", zIndex: "1", position: "fixed", top: "0px", left: "0px", width: "100%", height: "100%" } :
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
                            <div>ВВЕДИТЕ ИНФОРМАЦИЮ</div>
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>ФИО пациента:</div>
                            <input onChange={e => setFio(e.target.value)} className={classes6.myInput} type={"text"} size="50" />
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Дата рождения:</div>
                            <input onChange={e => setDate(e.target.value)} className={classes6.myInput} type={"date"} size="50" />
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>Номер телефона:</div>
                            <InputMask onChange={e => setTel(e.target.value)} mask={"+7(999)-999-99-99"} className={classes6.myInput} />
                        </div>
                        <div className={classes6.myInput__div}>
                            <div>ФИО врача:</div>
                            <input list={"character"} onChange={e => setDoctor(e.target.value)} className={classes6.myInput} type={"text"} size="50" />
                            <datalist id={"character"}>
                                {
                                    Data1.map((pacient) =>
                                        <option key={pacient.iddoc} value={pacient.fio}></option>)
                                }
                            </datalist>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                            <button onClick={enter} className={classes7.myButton}>ДОБАВИТЬ</button>
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

