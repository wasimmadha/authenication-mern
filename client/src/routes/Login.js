import React, {useState} from 'react'
import TextField from '@mui/material/TextField';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    async function loginUser(event){
      event.preventDefault()
      const response  = await fetch('http://localhost:1337/api/login/', {
        method: 'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
  
      const data = await response.json()   
      
      if(data.token)
      {
        console.log(data.token)   
        localStorage.setItem('token', data.token)
        alert('Login Successfull')
        window.location.href = '/quote'
      }
      else
      {
        alert('Not Successfull')
      }
    }
  
    return (
      <div>
        {/* This is for the registration Input */}
        <h1>Login</h1>
        <form onSubmit={loginUser}>
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

export default Login;