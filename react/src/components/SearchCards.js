
import ImageGallery from 'react-image-gallery';
import { Card, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material' 
import request from '../requests/Requests'


function UserCard({profile, isLogged, socket, setCounter, counterError}) {
    
    const images = []
    profile.photo.map(x => {
        const image = {original: x}
        images.push(image)
    })
    async function loveButton() {
        const response = await request.post({user: isLogged, match: profile.userName}, 'love')
        const users = {
            user: isLogged, 
            match: profile.userName
        }
        socket.emit('love', users)
        setCounter()
    }
    function skipButton() {
        setCounter()
    }
   
  return (
    <div>
        {counterError !== '' && <Typography variant="body2" color="text.secondary">{counterError}</Typography>}
        {counterError === '' && <Card sx={{ maxWidth: 550, margin: 'auto' }}>
            {profile.photo.length === 0 ?  <CardMedia component="img" image={profile.defaultPhoto} alt="" /> : <ImageGallery items={images} />}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={4} style={{margin: 'auto', display: 'flex'}}>
                        <Button onClick={skipButton} className='skip-button' style={{ padding: '50px', margin: 'auto'}}></Button>
                    </Grid>
                    <Grid item xs={3}>
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="div">{profile.userName} </Typography>
                            <Typography variant="body2" color="text.secondary">City: {profile.city}</Typography>
                            <Typography variant="body2" color="text.secondary">Age: {profile.age}</Typography>
                            <Typography variant="body2" color="text.secondary">Gender: {profile.gender} </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={4} style={{margin: 'auto', display: 'flex'}}>
                        <Button onClick={loveButton} className='love-button' style={{padding: '50px', margin: 'auto'}}></Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>}
    </div>
  )
}

export default UserCard