import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchId from './SearchId'


function SearchIdContainer() {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setLoading(true)
    }, [])

    function onChanged(e) {
        if(e != undefined) {
            if(e.target.id === 'name') {
                setName(e.target.value)
            } else if(e.target.id === 'email') {
                setEmail(e.target.value)
            }
        } else return 0
    }

    useEffect(() => {
        onChanged()
    }, [name, email])

    function handleSubmit(e) {
        e.preventDefault()

        // console.log(name)
        // console.log(email)
        const data = {
            name: name,
            email: email
        }
        
        axios.post(
            process.env.REACT_APP_SPRING_API + '/forgot/loginId', data, {
            withCredentials: true,
          }).then((res) => {console.log((res))})
            .catch((err) => {console.log(err)})
    }

    return (
        <SearchId
            loading = {loading}
            onChanged = {onChanged}
            handleSubmit = {handleSubmit}
            name = {name}
            email = {email}
        ></SearchId>
    )
}

export default SearchIdContainer;
