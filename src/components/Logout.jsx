import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/');
    }
  return (
    <div className='logout'>
      <Button
      type="submit" 
      name="logout" 
      variant="contained"
      onClick={handleSubmit}>ログアウト</Button>
    </div>
  )
}

export default Logout