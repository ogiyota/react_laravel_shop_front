import React from 'react'
import { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

const Contact = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');

    const handleChengeName = (e) =>{
        setName(e.target.value);
        console.log(name)
    }
    const handleChengeEmail = (e) =>{
        setEmail(e.target.value);
        console.log(email)
    }
    const handleChengeDetail = (e) =>{
        setDetail(e.target.value);
        console.log(detail)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/contact/send', {state:{name: name, email: email, detail: detail}})
    }

  return (
    <div>
        <h3 className='title'>お問い合わせ</h3>
        <form action="">
        <div className='name_and_email'>
        <TextField
              className='contact'
              margin='normal'
              type='text'
              name='name'
              label='お名前'
              variant='standard'
              value={name} onChange={handleChengeName}
            />
            <TextField
              className='contact'
              margin='normal'
              type='email'
              name='email'
              label='メールアドレス'
              variant='standard'
              value={email} onChange={handleChengeEmail}
            />
            </div>
            <TextField
              className='contactdetail'
              margin='normal'
              type='textarea'
              multiline
              rows={5}
              name='detail'
              label='お問い合わせ内容'
              variant='outlined'
              value={detail} onChange={handleChengeDetail}
              />
              <Button type="contactsubmit" name="item_image" variant="contained" onClick={(e) =>handleSubmit(e)}>
                お問い合わせ内容を確認
              </Button>
        </form>
    </div>
  )
}

export default Contact