
import ImageGallery from 'react-image-gallery';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material' 



function UserCard({profile}) {
    const images = []
    profile.photo.map(x => {
        const image = {original: x}
        images.push(image)
    })
   

  return (
    <Card style={{width: '550px', margin: '10px'}}>
        {profile.photo.length === 0 ?  <CardMedia component="img" image={profile.defaultPhoto} alt="" /> : <ImageGallery items={images} />}
    
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">{profile.userName} </Typography>
            <Typography variant="body2" color="text.secondary">City: {profile.city}</Typography>
            <Typography variant="body2" color="text.secondary">Age: {profile.age}</Typography>
            <Typography variant="body2" color="text.secondary">Gender: {profile.gender} </Typography>
        </CardContent>
    </Card>
  )
}

export default UserCard