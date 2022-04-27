//подключаем нужные библиотеки
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/context'
//подключаем красоту
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes5 from "../style/MyForm.module.css"
import classes6 from "../style/MyInput.module.css"
import classes7 from "../style/MyButton.module.css"
import classes8 from "../style/MyLoader.module.css"
//поключаем логотип и кнопку назад
import logo from "../image/1.jpg"
import logo2 from "../image/6.png"
//подключаем функцию для запросов
import { useHttp } from '../hooks/httpRequest'

export const OnePacientPage = () => {
    //для перхода на другие страницы
    const navigate = useNavigate()
    // для работы с запросом
    const params = useParams()
    const { request, loading } = useHttp()
    const [Data, setData] = useState({})
    const [seans, setSeans] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const { setIdPacient, setNamePacient } = useContext(AuthContext)

    //делаем запрос об информации пациента
    const fetchONEPAS = useCallback(async () => {
        try {
            const data = await request('/api/pacient/allPacient', 'POST', { number: params.id })
            if (data.status === 200) {
                setData(data.data)
                setSeans(data.data.seans)
                setIsLoading(true)
            } else {
            }
        } catch (e) { }
    }, [request, params.id])

    useEffect(() => {//чтобы один раз, а не постоянно
        fetchONEPAS()
    }, [fetchONEPAS])
    //для дла начала сеанса 
    const startsession = (e) => {
        e.preventDefault()
        setIdPacient(params.id)
        setNamePacient(Data.fio)
        navigate('/startsession')
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
                        <div className={classes1.nameUser}>{localStorage.getItem("user")}</div>
                        <div onClick={() => navigate('/pacient')} style={{ border: "none" }} className={classes1.header__logo}>
                            <img src={logo2} alt="" />
                        </div>
                    </div>
                </div>
            </header >
            <div style={loading ? { backgroundColor: "#cdeef6", paddingTop: "150px", display: "flex", justifyContent: "center", zIndex: "1", position: "fixed", top: "0px", left: "0px", width: "100%", height: "100%" } :
                { display: "none" }} className={classes3.myMain}>
                <div className={classes8.loader}>
                </div>
            </div>
            <div className={classes3.myMain}>
                <div className={classes2.myContainer}>
                    {isloading === true
                        ? <form className={classes5.formLoginPage}>
                            <div className={classes6.myInput__div1}>
                                <div>{Data.fio}</div>
                            </div>
                            <div className={classes6.myInput__div1}>
                                <div>{`Дата рождения: ${Data.date}`}</div>
                            </div>
                            <div className={classes6.myInput__div1}>
                                <div>{`Телефон: ${Data.telPacient}`}</div>
                            </div>
                            <div className={classes6.myInput__div1}>
                                <div>{`Врач: ${Data.doctor}`}</div>
                            </div>
                            <div>
                                <div>
                                    {seans.length !== 0
                                        ? <div> {
                                            seans.map((seans) =>
                                                <div>
                                                    <div>{seans.date}</div>
                                                    <div>{seans.description}</div>
                                                    <div>{seans.commentD}</div>
                                                    <div>{seans.commentP}</div>
                                                </div>)
                                        }</div>
                                        : <div className={classes6.myInput__div1}>
                                            <div>ПОКА СЕАНСОВ НЕТ</div>
                                        </div>}
                                </div>
                            </div>
                        </form>
                        : <form className={classes5.formLoginPage}>
                            <div className={classes6.myInput__div1}>
                                <div>Не удалось загрузить страницу пациента</div>
                            </div>
                        </form>
                    }
                </div>
            </div>
            <div className={classes3.myContact}>
                <div className={classes2.myContainerMain}>
                    <button onClick={startsession} className={classes7.myButton}>НАЧАТЬ НОВЫЙ СЕАНС</button>
                </div>
            </div>
        </div >
    )
}