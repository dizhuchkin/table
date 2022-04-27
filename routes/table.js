
const fetch = require("cross-fetch")
const Router = require('express')
const router = Router()


router.post('/start', async (req, res) => {
    try {
        res.status(201).json({ status: 200, message: "Связь со столом установлена" })
    } catch (e) {
        res.status(500).json({ status: 500, message: "ОШИБКА: ОШИБКА НА СЕРВЕРЕ" })
    }
})

module.exports = router