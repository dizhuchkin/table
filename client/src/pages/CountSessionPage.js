//подключаем нужные библиотеки
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/context'
//подключаем красоту
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes5 from "../style/MyForm.module.css"
import classes6 from "../style/MyTable.module.css"
import classes7 from "../style/MyInputRange1.module.css"
import classes8 from "../style/MyButton.module.css"
import classes9 from "../style/MyInput.module.css"
//поключаем логотип и кнопку назад 
import logo from "../image/1.jpg"
import table from "../image/2.png"
import logo2 from "../image/6.png"

import { useHttp } from '../hooks/httpRequest'

export const CountSessionPage = () => {
    //для перехода по страницам
    const navigate = useNavigate()

    //для работы с таймером и пациентом
    const { idPacient, namePacient, time } = useContext(AuthContext)
    //для фиксирования показателей
    const [value1, setValue1] = useState('0')
    const [value2, setValue2] = useState('0')
    const [value3, setValue3] = useState('0')
    const [value4, setValue4] = useState('0')
    const [value5, setValue5] = useState('0')
    const [value6, setValue6] = useState('0')
    const [value7, setValue7] = useState('0')
    const [value8, setValue8] = useState('0')
    const [value9, setValue9] = useState('0')
    const [value10, setValue10] = useState('0')
    const [value11, setValue11] = useState('0')
    const [value12, setValue12] = useState('0')

    //время
    const [timeLeft, setTimeLeft] = useState(time * 60)
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
    const seconds = (timeLeft - minutes * 60).toString().padStart(2, '0')
    const [isStart, setIsStart] = useState(false)
    const [isRead, setIsRead] = useState(false)
    //для работы с запросом
    const { loading, request } = useHttp()

    const changeRead = (e) => {
        e.preventDefault()
        if (isRead) {
            setIsRead(false)
        }
        else {
            setIsRead(true)
        }

    }

    const toTable = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/api/table/start', 'POST', { start1: 1 })
            if (data.status === 200) {
                console.log(data)
            }
        } catch (e) { }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            isStart && setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
        }, 1000)

        if (timeLeft === 0) {
            setIsStart(false)
            // выползает форма для заполения
            setIsRead(true)
        }

        return () => {
            clearInterval(interval)
        }

    }, [isStart, timeLeft])

    const start = (e) => {
        if (timeLeft === 0) setTimeLeft(time * 60)
        e.preventDefault()
        setIsStart(true)
        toTable(e)
    }

    const stop = (e) => {
        e.preventDefault()
        setIsStart(false)
    }

    const reset = (e) => {
        e.preventDefault()
        setIsStart(false)
        setTimeLeft(time * 60)
    }

    return (
        <div>
            <header className={classes1.myHeader}>
                <div className={classes2.myContainer}>
                    <div className={classes1.header__body}>
                        <a href="https://minzdrav.gov.ru/" className={classes1.header__logo}>
                            <img src={logo} alt="" />
                        </a>
                        <div className={classes1.nameUser}>{localStorage.getItem("user")}</div>
                        <div onClick={() => navigate('/startsession')} style={{ border: "none" }} className={classes1.header__logo}>
                            <img src={logo2} alt="" />
                        </div>

                    </div>
                </div>
            </header >

            <div style={isRead ? { paddingTop: "150px", display: "flex", justifyContent: "center", zIndex: "1", position: "fixed", top: "0px", left: "0px", width: "100%", height: "100%" } :
                { display: "none" }} className={classes3.myMain}>
                <div style={loading ? { display: "none", flexDirection: "column" } : { display: "flex", flexDirection: "column" }}>
                    <div className={classes9.myInput__div}>Здесь будет форма для заполнения</div>
                    <button style={{ margin: "10px" }} onClick={changeRead} className={classes8.myButton}>Окей</button>
                </div>
            </div>

            <div className={classes3.myMain}>
                <form className={classes5.formLoginPage}>
                    <table className={classes6.myTableData1}>
                        <tbody>
                            <tr >
                                <td style={{ border: "solid", borderColor: "#689cd2" }}>
                                    <div>ЛЕВАЯ РУКА</div>
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value1}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue1(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>↑</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value2}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue2(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>→</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value3}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue3(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>°</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{ border: "none" }} className={classes6.tdCenter}>
                                    <div>----------</div>
                                </td>
                                <td style={{ border: "solid", borderColor: "#689cd2" }}>
                                    <div>ПРАВАЯ РУКА</div>
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value4}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue4(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>↑</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value5}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue5(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>→</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value6}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue6(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>°</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "none" }}>
                                    <div className={classes9.myInput__divtime2}>{minutes}мин.</div>
                                </td>
                                <td style={{ border: "none" }} className={classes6.tdCenter} >
                                    <img className={classes6.image} src={table} alt='' />
                                </td>
                                <td style={{ border: "none" }}>
                                    <div className={classes9.myInput__divtime2}>{seconds}сек.</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "solid", borderColor: "#689cd2" }}>
                                    <div>ЛЕВАЯ НОГА</div>
                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value7}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue7(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>↑</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value8}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue8(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>→</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value9}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue9(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>°</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{ border: "none" }} className={classes6.tdCenter}>
                                    <div>----------</div>
                                </td>
                                <td style={{ border: "solid", borderColor: "#689cd2" }}>
                                    <div >ПРАВАЯ НОГА</div>
                                    <table style={{ width: '100%' }}>
                                        <tbody >
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value10}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue10(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>↑</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value11}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue11(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>→</td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "none" }}> <div className={classes6.myTd}>{value12}</div></td>
                                                <td style={{ border: "none" }}><input onChange={e => setValue12(e.target.value)} className={classes7.myInputRange} type={"range"} min={"-5"} max={"5"} step={"1"} /></td>
                                                <td style={{ fontSize: '2rem', border: "none" }}>°</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {isStart
                            ? <button onClick={stop} style={{ width: "50%" }} className={classes8.myButton}>СТОП</button>
                            : <button onClick={start} style={{ width: "50%" }} className={classes8.myButton}>СТАРТ</button>}
                        <button onClick={reset} style={{ width: "50%" }} className={classes8.myButton}>СБРОС</button>
                    </div>
                    <div style={{ fontSize: "2rem" }} className={classes9.myInput__divtime}>
                        <div>{minutes}:{seconds}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}