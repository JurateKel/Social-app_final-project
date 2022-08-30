import {Button, Container} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import request from '../requests/Requests';
import {useState, useEffect} from 'react';
import UserCard from '../components/UserCard';



function History({isLogged}) {
    const [users, setUsers] = useState([])
    async function iLoveFunction() {
        const response = await request.post({user: isLogged}, 'history')
        setUsers(response.iLove)
    }
    useEffect(()=> {
        iLoveFunction()
    }, [])
    async function lovesMeFunction() {
        const response = await request.post({user: isLogged}, 'history')
        setUsers(response.lovesMe)
    }
  return (
    <div>
        <Grid container >
            <Grid xs={6}><Button fullWidth onClick={iLoveFunction}  >People I liked</Button></Grid>
            <Grid xs={6}><Button fullWidth onClick={lovesMeFunction} >People liked me</Button></Grid>
        </Grid>
        <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>{users.length > 0 && users.map((x,i) => <UserCard key={i} profile={x}/> )}</Container>
    </div>
  )
}

export default History