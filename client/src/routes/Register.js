import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    async function registerUser(event){
      event.preventDefault()
      const response  = await fetch('http://localhost:1337/api/register/', {
        method: 'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name, 
          email,
          password
        })
      })
  
      const data = await response.json()
      console.log(data.status)
      if(data.status === 'ok'){
        window.location.href = '/login'
        navigate('/login')
      }
    }
  
    return (
      <div>
        {/* This is for the registration Input */}
        <h1>Registration</h1>
        <form onSubmit={registerUser}>
          <TextField
            helperText="Please enter your name" 
            required
            id="outlined-required"
            label="Name"
            value={name} onChange={(event) => setName(event.target.value)} 
            type="text" 
            placeholder="Name"
          />
          <TextField
            helperText="Please enter your Email" 
            required
            id="outlined-required"
            label="Email"
            value={email} onChange={(event) => setEmail(event.target.value)} 
            type="email" 
            placeholder="Email"
          />
          <TextField
            helperText="Please enter your Password" 
            required
            id="outlined-required"
            label="Password"
            value={password} onChange={(event) => setPassword(event.target.value)} 
            type="password" 
            placeholder="Password"
          />
          <br/>
  
          <button className='btn-submit'>Submit</button>
        </form>
      </div>
    )
}

export default Register;