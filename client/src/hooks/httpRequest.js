import { useState, useCallback } from "react"

export const useHttp = () => {

    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            setLoading(false)
            return data

        } catch (e) {
            setLoading(false)
            return e.message
        }
    }, [])


    return { loading, request }
}