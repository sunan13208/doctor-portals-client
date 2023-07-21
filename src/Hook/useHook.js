import { useEffect } from "react"
import { useState } from "react"

const useToken = (email) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        if (email) {
            fetch(`https://doctor-portal-server-lyart.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        setToken(data.accessToken)
                        localStorage.setItem('accessToken', data.accessToken)
                    }
                })
        }
    }, [email])
    return [token]

}

export default useToken