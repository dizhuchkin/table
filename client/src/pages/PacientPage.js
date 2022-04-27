//подключаем нужные библиотеки
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
//подключаем красоту
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes7 from "../style/MyButton.module.css"
import classes8 from "../style/MyLoader.module.css"
import classes9 from "../style/MyTable.module.css"
//поключаем логотип и кнопку назад
import logo from "../image/1.jpg"
import logo2 from "../image/6.png"
//подключаем функцию для запросов
import { useHttp } from '../hooks/httpRequest'

export const PacientPage = () => {

    //для перхода надругие страницы
    const navigate = useNavigate()

    //для работы с запросами
    const { request, loading } = useHttp()
    const [Data, setData] = useState([])

    //делаем запрос информации обо всех пациентах
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
                        <div onClick={() => navigate('/main')} style={{ border: "none" }} className={classes1.header__logo}>
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
                <div style={{ paddingTop: "100px", paddingBottom: "100px" }} className={classes2.myContainer}>
                    {Data.length !== 0
                        ?
                        <table className={classes9.myTableData}>
                            <thead><tr>
                                <td>Пациент</td>
                                <td>Доктор</td>
                                <td>Действие</td>
                            </tr>
                            </thead>
                            <tbody>
                                {Data.map((pacient) =>
                                    <tr key={[pacient.idPacient]}>
                                        <td style={{ width: '33%' }}>{pacient.fio}</td>
                                        <td style={{ width: '33%' }}>{pacient.doctor}</td>
                                        <td onClick={() => navigate(`/pacient/${pacient.id}`)} style={{ width: '33%' }}>ОТКРЫТЬ</td>
                                    </tr>)}
                            </tbody>
                        </table>
                        : <div>НЕТ ИНФОРМАЦИИ О ПАЦИЕНТАХ</div>
                    }
                </div>
            </div>
            <div className={classes3.myContact}>
                <div className={classes2.myContainerMain}>
                    <button onClick={e => navigate('/addpacient')} className={classes7.myButton}>ДОБАВИТЬ ПАЦИЕНТА</button>
                </div>
            </div>
        </div>
    )
}