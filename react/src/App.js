import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react'
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Toolbar from './components/Toolbar';
import Filter from './pages/Filter';
import Search from './pages/Search';
import request from './requests/Requests'
import io from 'socket.io-client'
import History from './pages/History';
const socket = io.connect('http://localhost:4000')


function App() {

  const [isLogged, setIsLogged] = useState(null)
  const [profile, setProfile] = useState(null)
  const [cities, setCities] = useState([])

  async function ifIsLogged () {
    const response = await request.get('sessionUser')
    setIsLogged(response.user)

  }
  async function getProfile() {
    const profileData = await request.post( {currentUser: isLogged}, 'profile' )
    setProfile(profileData);
  }  
  useEffect( () => {
    (async() => setCities(await request.get('cities')))()

  }, [])
  useEffect(() => {
    if (isLogged !== null) getProfile()
  }, [isLogged, profile])

  useEffect(() => {
    ifIsLogged()
  }, [])

  
  return (
    <div className="App">
      <BrowserRouter > 
      <Toolbar isLogged={isLogged} setIsLogged={setIsLogged} profile={profile} socket={socket} />
      <Routes>
        <Route path='/' element={<Register cities={cities} />}/>
        <Route path='/login' element={<Login setIsLogged={setIsLogged} socket={socket} />}/>
        <Route path='/user/:userName' element={<UserProfile isLogged={isLogged} profile={profile} getProfile={getProfile}/>}/>
        <Route path='/filter' element={<Filter isLogged={isLogged} profile={profile} cities={cities}/>}/>
        <Route path='/search' element={<Search isLogged={isLogged} profile={profile} socket={socket} />}/>
        <Route path='/history' element={<History isLogged={isLogged} />}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
