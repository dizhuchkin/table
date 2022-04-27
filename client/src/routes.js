import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { PacientPage } from './pages/PacientPage'
import { OnePacientPage } from './pages/OnePacientPage'
import { AddPacient } from './pages/AddPacient'
import { StartSessionPage } from './pages/StartSessionPage'
import { CountSessionPage } from './pages/CountSessionPage'
import { AuthorizationPage } from './pages/AuthorizationPage'
import { ManualPage } from './pages/ManualPage'


export const useRoutes = isАuthorization => {
    if (isАuthorization) {
        return (
            <Routes>
                <Route key='/main' element={<MainPage />} path='/main' exact />
                <Route key='/pacient' element={<PacientPage />} path='/pacient' exact />
                <Route key='/openpacient' element={<OnePacientPage />} path='/pacient/:id' exact />
                <Route key='/addpacient' element={<AddPacient />} path='/addpacient' exact />
                <Route key='/startsession' element={<StartSessionPage />} path='/startsession' exact />
                <Route key='/countsession' element={<CountSessionPage />} path='/countsession' exact />
                <Route key='/manual' element={<ManualPage />} path='/manual' exact />
                <Route key='*' element={<Navigate to="/main" replace />} path='*' exact />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route key='/' element={<AuthorizationPage />} path='/' exact />
            <Route key='*' element={<Navigate to="/" replace />} path='*' exact />
        </Routes>
    )
}