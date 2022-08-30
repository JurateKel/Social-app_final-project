import UserCard from '../components/UserCard';
import Box from '@mui/material/Box';
import UploadPhoto from '../components/UploadPhoto';

function UserProfile({profile, getProfile}) {

  return (
    <Box className='d-flex j-sp-btw m-auto' maxWidth='lg'>
      {profile !== null && <UserCard profile={profile} />}
      {profile !== null && <UploadPhoto profile={profile} getProfile={getProfile} />}
    </Box>
  )
}

export default UserProfile