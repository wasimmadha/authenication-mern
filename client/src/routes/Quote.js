import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';


const Quote = () => {

    const [quote, setQuote] = useState('')
    const [tempquote, setTempquote] = useState('')
    const navigate = useNavigate()

    async function populateQuote(){
        const response = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = response.json()
        if(data.status === "ok"){
            setQuote(data.quote)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const user = jwtDecode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login') 
            }else{
                populateQuote()
            }
        }
    })

    async function updateQuote(event){
        event.preventDefault()
        const response  = await fetch('http://localhost:1337/api/quote/', {
        headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                quote: tempquote
            })
        })

        const data = await response.json()

        if(data.status === "ok"){
            setQuote(data.quote)
            setTempquote('')
        }
    }
  return (
    <div>
        <h1>Quote: {quote || 'No Quote Found'}</h1>
    <form onSubmit={updateQuote}>
          <TextField
            helperText="Please enter your Quote" 
            required
            id="outlined-required"
            label="Quote"
            value={tempquote} onChange={(event) => setTempquote(event.target.value)} 
            type="text" 
            placeholder="Quote"
          />
          <button className='btn-submit'>Submit</button>
        </form>
    </div>
  )
}

export default Quote