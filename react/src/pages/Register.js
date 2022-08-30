import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import request from '../requests/Requests'
import {Input, Box, Slider, Container, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, NativeSelect } from '@mui/material'
const ariaLabel = { 'aria-label': 'description' };


function Register({cities}) {
    const marks = [
        {
          value: 18,
          label: '18',
        },
        {
          value: 25,
          label: '25',
        },
        {
          value: 35,
          label: '35',
        },
        {
          value: 45,
          label: '45',
        },
        {
          value: 55,
          label: '55',
        },
        {
          value: 65,
          label: '65',
        }
    ]
    const [error, setError] = useState('')
    const [age, setAge] = useState(30)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [gender, setGender] = useState('female')
    const [city, setCity] = useState('Vilnius')
    const navigate = useNavigate()

    async function getData() {
      setError('')
      const user = {
        userName: userName,
        passOne: password,
        passTwo: repeatPassword,
        gender: gender,
        city: city,
        age: age
      }
      if (userName.length === 0 || password.length === 0 ) return setError('User name and password can not be empty')
      if (user.passOne !== user.passTwo) return setError('Passwords does not match')

      const response = await request.post(user, 'registration')
      if (response.error) setError(response.message)
      if (!response.error) {
        navigate('/login')
      }
    }
    
  return (
    <Container maxWidth="sm" >
        <Input fullWidth placeholder="User name" inputProps={ariaLabel} onChange={(event)=> setUserName(event.target.value)}/>
        <Input fullWidth type="password" placeholder="Password" inputProps={ariaLabel} onChange={(event)=> setPassword(event.target.value)}/>
        <Input fullWidth className='mb-20' type="password" placeholder="Repeat password" inputProps={ariaLabel} onChange={(event)=> setRepeatPassword(event.target.value)}/>
        <FormControl>
            <FormLabel sx={{fontSize: '12px'}} id="demo-row-radio-buttons-group-label" >Gender</FormLabel>
            <RadioGroup onChange={(event, value) => { setGender(value)}} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" defaultValue="female">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
        <FormControl fullWidth >
            <InputLabel  shrink variant="standard" id="demo-simple-select-standard-label" htmlFor="uncontrolled-native">City</InputLabel>
            <NativeSelect className='mb-20' onChange={(event)=> setCity(event.target.value)} value={age} label="Age">
            {cities.length >0 && cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
            </NativeSelect>
        </FormControl>
        <Box >
          <InputLabel shrink variant="standard" htmlFor="input-slider">Age</InputLabel>
          <Slider aria-label="Custom marks" defaultValue={30} min={18} max={65} valueLabelDisplay="auto" step={1} marks={marks} onChange={(event, value) => { setAge(value)}} />
        </Box>
        {error && <p>{error}</p>}
        <Button fullWidth color="inherit" onClick={getData}>Register</Button>
    </Container>
  )
}

export default Register

