const fetch = require("cross-fetch")
const bcrypt = require('bcryptjs')
const Router = require('express')
const { body, validationResult } = require('express-validator')
const router = Router()

//обрабатываем запрос /api/authorization/login - вход врача
router.post('/login',
    body('login').isLength({ min: 1 }),
    body('password').isLength({ min: 1 }), async (req, res) => {
        try {
            //проверка корректности данных
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(500).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Некорректный данные при регистрации'
                })
            }
            //проверка наличия даного пользователся
            const response = await fetch("https://624ec3fa8c5bf4a10541134b.mockapi.io/api/users")
            const data = await response.json()
            if (!response.ok) {
                return res.status(404).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Нет связи с БД'
                })
            }
            let sovp = false
            let user1 = {}
            const prov = data.map((user) => {
                if (req.body.login === user.login) {
                    sovp = true
                    user1 = user
                }
            })
            if (!sovp) {
                return res.status(400).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Данного пользователя не существует'
                })
            }
            //проверка пароля
            const isMatch = await bcrypt.compare(req.body.password, user1.password)

            if (!isMatch) {
                return res.status(400).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Неверный пароль'
                })
            }

            res.status(201).json({ status: 200, message: "Вход успешен", fio: `${user1.fio}`, token: `${user1.idUser}` })
        } catch (e) {
            res.status(500).json({ status: 500, message: "ОШИБКА: Нет связи с БД" })
        }
    })

module.exports = router