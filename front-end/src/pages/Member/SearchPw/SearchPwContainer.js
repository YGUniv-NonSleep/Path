import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchPw from './SearchPw'

function SearchPwContainer() {
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        setLoading(true)
    }, [])

    function onChanged(e) {
        if(e != undefined) {
            if(e.target.id === 'userId') {
                setUserId(e.target.value)
            } else if(e.target.id === 'phone') {
                setPhone(e.target.value)
            }
        } else return 0
    }

    useEffect(() => {
        onChanged()
    }, [userId, phone])

    function handleUserFind(e) {
        e.preventDefault()

        // console.log(userId)
        // console.log(phone)
        const data = {
            userId: userId,
            phone: phone
        }
        
        axios.post(
            process.env.REACT_APP_SPRING_API + '/forgot/password', data, {
            withCredentials: true,
          }).then((res) => {console.log((res))})
            .catch((err) => {console.log(err)})
    }

    return (
        <SearchPw
            loading = {loading}
            onChanged = {onChanged}
            handleUserFind = {handleUserFind}
            userId = {userId}
            phone = {phone}
        ></SearchPw>
    )
}

export default SearchPwContainer;
