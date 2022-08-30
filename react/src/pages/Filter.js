import {Container, Button, Slider, Box, InputLabel, FormControl, NativeSelect, Radio, RadioGroup, FormControlLabel, FormLabel} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import request from '../requests/Requests'

function Filter({cities, isLogged}) {
    const navigate = useNavigate()
    const [age, setAge] = useState(30)
    const [city, setCity] = useState('Vilnius')
    const [gender, setGender] = useState('female')
    const [error, setError] = useState()
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

    async function getFilterData() {
        const filter = {
            userName: isLogged,
            city,
            age,
            gender
        }
       const response = await request.post(filter, 'filter') 
       if (response.error === false) navigate('/search')
       if (response.error === true) setError(response.message)
    }

  return (
    <Container maxWidth="sm">
        <FormControl fullWidth >
            <InputLabel  shrink variant="standard" id="demo-simple-select-standard-label" htmlFor="uncontrolled-native">City</InputLabel>
            <NativeSelect className='mb-20' onChange={(event)=> setCity(event.target.value)} value={age} label="Age">
            {cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
            </NativeSelect>
        </FormControl>
        <InputLabel shrink variant="standard" htmlFor="input-slider">Age</InputLabel>
        <Slider aria-label="Custom marks" defaultValue={30} min={18} max={65} valueLabelDisplay="auto" step={1} marks={marks} onChange={(event, value) => { setAge(value)}} />
        <FormControl>
            <FormLabel sx={{fontSize: '12px'}} id="demo-row-radio-buttons-group-label" >Gender</FormLabel>
            <RadioGroup onChange={(event, value) => { setGender(value)}} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" defaultValue="female">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
        {error && <h4>{error}</h4>}
        <Box ><Button fullWidth color="inherit" onClick={getFilterData}>Filter</Button></Box>
    </Container>
  )
}

export default Filter