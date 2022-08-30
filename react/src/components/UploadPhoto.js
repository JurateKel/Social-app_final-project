import { TextField, Card, CardContent, CardMedia, Button, Typography } from '@mui/material' 
import { useParams, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import request from '../requests/Requests';

function UploadPhoto({profile, getProfile}) {
    const [photo, setPhoto] = useState('')
    const [error, setError] = useState()
    const navigate = useNavigate()



    async function addPhoto() {
      const user = {
        name: profile.userName,
        photo: photo
      }
      const response = await request.post(user, 'uploadPhoto')
      setError(response.message)
      getProfile()
      setPhoto('')
    }
  return (
    <Card sx={{ width: 550, padding: '20px' }} className='d-flex f-column'>
        <Typography variant="h6" color="text.secondary"> Add at least 2 photos to continue : </Typography>
        <TextField  id="standard-basic" label="Photo url" variant="standard" onChange={(event) => { setPhoto(event.target.value)}} value={photo} />
        {error && <h4>{error}</h4>}
        <Button color="inherit" onClick={addPhoto} >Add photo</Button>
        {profile && profile.photo.length > 1 && <Button onClick={() => navigate('/filter')} color="inherit">Filter users</Button>}
    </Card>
  )
}

export default UploadPhoto