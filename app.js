const express = require('express')
const config = require('config')
const path = require('path')
const res = require('express/lib/response')
//порт
const PORT = config.get('port') || 5000
//сервер
const app = express()


//стартовые загрузки
async function start() {
    try {
        //включаем сервер
        app.listen(PORT)
        console.log('Сервер запущен')
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()


app.use(express.json({ extended: true }))
//обработка запросов
app.use('/api/authorization', require('./routes/authorization')) //авторизация
app.use('/api/pacient', require('./routes/pacient')) //запрос информацаии о пациентах
app.use('/api/table', require('./routes/table'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
