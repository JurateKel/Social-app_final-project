import {useEffect, useState} from 'react'
import request from '../requests/Requests'
import {Container, Typography} from '@mui/material'
import SearchCards from '../components/SearchCards'

function Search({isLogged, socket}) {

    const [filtered, setFiltered] = useState([])
    const [counter, setCounter] = useState(0)
    const [counterError, setCounterError] = useState('')
    async function getFilteredUsers() {
        const response = await request.post({userName: isLogged}, 'search')
        if (response.error === false) setFiltered(response.filteredUsers)
        else console.log(response.message)
    }
    useEffect(() => {
        if (isLogged) getFilteredUsers()
    }, [isLogged])

    function setCounterFunc() {
      if (counter >= filtered.length-1) setCounterError('No more to show. Change filter to find more users')
      else setCounter(counter+1)
    }

  return (
    <div>
      <Container>
          {filtered && filtered.length > 0 && <SearchCards isLogged={isLogged} profile={filtered[counter]} setCounter={setCounterFunc} socket={socket} counterError={counterError}/>}
      </Container>
      <Container>
      {filtered && filtered.length === 0 && <Typography variant="body2" color="text.secondary">No users matching filtered criterias. Please search again.</Typography>}
      </Container>
    </div>
  )
}

export default Search