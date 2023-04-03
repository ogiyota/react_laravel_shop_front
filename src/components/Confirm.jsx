import React from 'react'
import { Button, Box } from '@mui/material';
import Detail from './Detail';

const Confirm = (props) => {

    const handleSubmit = () =>{
        return true;
    }

    const handleFalseSubmit = () => {
        return <Detail bool="false"/>;

    }
  return (
    <div className='confirm'>
        <p className='confirmword'>をカートに追加しますか</p>
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
      <Button type="submit" name="oncart" variant="contained" onClick={handleFalseSubmit} style={{ marginRight: '3rem' }}>
        いいえ
      </Button>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        はい
      </Button>
    </Box>
    </div>
  )
}

export default Confirm