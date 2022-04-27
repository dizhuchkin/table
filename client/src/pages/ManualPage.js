import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes1 from "../style/MyHeader.module.css"
import classes2 from "../style/MyContainer.module.css"
import classes3 from "../style/MyMain.module.css"
import classes4 from "../style/MyContact.module.css"
import logo from "../image/1.jpg"
import logo2 from "../image/6.png"

export const ManualPage = () => {
    //для раьоты с кнопкой бургером
    const navigate = useNavigate()


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
            <div>
                <div className={classes3.myMain}>
                    <div style={{ fontSize: "3rem", paddingTop: "200px", display: "flex", flexDirection: "column", marginBottom: "100px" }} className={classes2.myContainer}>
                        Начинает — стоит,
                        кончает — кланяется,
                        Из трех букв состоит,
                        на «х» начинается.
                    </div>
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