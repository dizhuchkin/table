const fetch = require("cross-fetch")
const Router = require('express')
const { body, validationResult } = require('express-validator')
const router = Router()

//запрос информации об одном или всех пациентах
router.post('/allPacient', async (req, res) => {
    try {
        //если нужно всех пациентов
        if (req.body.number === 0) {
            let Data = []
            const response = await fetch("https://624ec3fa8c5bf4a10541134b.mockapi.io/api/pacient")
            const data = await response.json()
            if (!response.ok) {
                return res.status(404).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Нет связи с БД'
                })
            }
            //сортировка
            Data = data.sort((a, b) => a['fio'].localeCompare(b['fio']))
            res.status(201).json({ status: 200, message: `Запрос успешен`, data: Data })
        }
        else {
            //если нужно одного пациента
            const response = await fetch("https://624ec3fa8c5bf4a10541134b.mockapi.io/api/pacient")
            const data = await response.json()
            if (!response.ok) {
                return res.status(404).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Нет связи с БД'
                })
            }

            let data1 = {}
            const prov = data.map((user) => {
                if (req.body.number === user.id) {
                    data1 = {
                        fio: user.fio,
                        date: user.date,
                        doctor: user.doctor,
                        idPacient: user.idPacient,
                        telPacient: user.telPacient,
                        seans: user.seans
                    }
                }
            })


            res.status(201).json({ status: 200, message: `Запрос успешен`, data: data1 })
        }
    } catch (e) {
        res.status(500).json({ status: 500, message: "ОШИБКА: Нет связи с БД" })
    }
})

//добавление пациента
router.post('/addPacient',
    body('fio').isLength({ min: 1 }),
    body('date').isLength({ min: 1 }),
    body('tel').isLength({ min: 17 }),
    body('doctor').isLength({ min: 1 }), async (req, res) => {
        try {
            //проверка корректности данных
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(500).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Некорректный данные при добавлении пациента'
                })
            }
            //сравниваем с уже существующими пациентами
            const response = await fetch("https://624ec3fa8c5bf4a10541134b.mockapi.io/api/pacient")
            const data = await response.json()
            if (!response.ok) {
                return res.status(404).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Нет связи с БД'
                })
            }

            let sovp = false
            const prov = data.map((user) => {
                if ((req.body.fio === user.fio) && (req.body.date === user.date)) {
                    sovp = true
                }
            })
            if (sovp) {
                return res.status(400).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Данный пациент существует'
                })
            }

            const data1 = {
                fio: req.body.fio,
                date: req.body.date,
                doctor: req.body.doctor,
                idPacient: Number(new Date()),
                telPacient: req.body.tel,
                seans: []
            }

            const response1 = await fetch("https://624ec3fa8c5bf4a10541134b.mockapi.io/api/pacient", {
                method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(data1)
            })
            if (!response1.ok) {
                return res.status(500).json({
                    errors: errors.array(),
                    status: 500,
                    message: 'ОШИБКА: Нет связи с БД'
                })
            }

            res.status(201).json({ status: 200, message: `Пациент успешно добавлен` })
        } catch (e) {
            res.status(500).json({ status: 500, message: "ОШИБКА: Нет связи с БД" })
        }
    })

//запрос фамилий докторов для проведения сеанса
router.post('/allDoctor', async (req, res) => {
    try {

        const response = await fetch("https://624ec3fa8c5bf4a10541134b.mockapi.io/api/users")
        const data = await response.json()
        if (!response.ok) {
            return res.status(404).json({
                errors: errors.array(),
                status: 500,
                message: 'ОШИБКА: Нет связи с БД'
            })
        }

        let data1 = []

        data.map((user) => {
            data1.push({ fio: user.fio, iddoc: user.idUser })
        })

        res.status(201).json({ status: 200, message: `Пациент успешно добавлен`, data: data1 })
    } catch (e) {
        res.status(500).json({ status: 500, message: "ОШИБКА: Нет связи с БД" })
    }
})


module.exports = router