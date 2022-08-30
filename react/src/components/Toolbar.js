import request from '../requests/Requests';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import ToolbarMUI from '@mui/material/Toolbar';
import {Button, Badge, AppBar, Box, Typography} from '@mui/material';


function Toolbar({isLogged, setIsLogged, profile, socket}) {
  const [gotLove, setGotLove] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    socket.on('loved', (user) => setGotLove(gotLove+1))
  }, [gotLove])
  function logout () {
    request.get('logout')
    setIsLogged(null)
    navigate('/login')
  }
  function goToHistory() {
    setGotLove(0)
    navigate('/history')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar possition="static">
             {isLogged !== null ?
                <ToolbarMUI>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Hello {isLogged}</Typography>
                  <Button color="inherit" onClick={()=> navigate(`/user/${isLogged}`)}>Your profile</Button>
                  {profile && profile.photo.length > 1 && <Button color="inherit" onClick={()=> navigate('/filter')}>Filter users</Button>}
                  {profile && profile.photo.length > 1 && <Button color="inherit" onClick={()=> navigate('/search')}>Look for a match</Button>}
                  {profile && profile.photo.length > 1 && <Badge badgeContent={gotLove} color="secondary"><Button color="inherit" onClick={goToHistory}>Your history</Button></Badge>}
                  <Button color="inherit" onClick={logout}>Log out</Button>
                </ToolbarMUI>
              :
              <ToolbarMUI>
                <Button color="inherit" onClick={()=> navigate('/')}>Register</Button>
                <Button color="inherit" onClick={()=> navigate('/login')}>Login</Button>
              </ToolbarMUI>
              }
        </AppBar>
    </Box>
  )
}

export default Toolbar