import React, { useEffect, useState } from 'react'
import { AuthContext } from "./context/context";
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [idPacient, setIdPacient] = useState(0)
  const [namePacient, setNamePacient] = useState('')
  const [time, setTime] = useState(0)

  useEffect(() => {

    //проверка на существование токена для автоматического входа
    const data = localStorage.getItem("token")
    if (data) {
      setIsAuth(true)//авторизация была пройдена
    }
    else {
      setIsAuth(false)//авторизация не была пройедна
    }
  }, [])

  const routes = useRoutes(isAuth)

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      idPacient,
      setIdPacient,
      namePacient,
      setNamePacient,
      time,
      setTime
    }}>
      <BrowserRouter>
        <div>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
