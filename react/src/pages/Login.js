import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import request from '../requests/Requests';
import {Container, Input, Checkbox, FormControlLabel, Button, Box} from '@mui/material';
const ariaLabel = { 'aria-label': 'description' };



function Login({ setIsLogged, socket }) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [stayLogged, setStayLogged] = useState(true)

    const [error, setError] = useState()
    const navigate = useNavigate()
    async function login() {
        setError('')
        const user = {
            userName: userName,
            password: password,
            stayLogged: stayLogged
        }
        const response = await request.post(user, 'login')
        if (response.error === false) {
          setIsLogged(user.userName)
          socket.emit('addUser', user.userName)
          return navigate(`/user/${user.userName}`)
        }
        if (response.error === true) return setError(response.message)
    }

  return (
    <Container maxWidth="sm">
       <Input fullWidth placeholder="User name" inputProps={ariaLabel} onChange={(event)=> setUserName(event.target.value)}/>
       <Input fullWidth type="password" placeholder="Password" inputProps={ariaLabel} onChange={(event)=> setPassword(event.target.value)}/>
       <FormControlLabel control={<Checkbox defaultChecked onChange={(event)=> setStayLogged(event.target.checked)}/>} label="Stay logged in" />
        {error && <h4>{error}</h4>}
        <Button fullWidth color="inherit" onClick={login}>Login</Button>
    </Container>
  )
}

export default Login