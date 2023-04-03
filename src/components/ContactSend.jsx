import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState } from 'react';

const ContactSend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state.name;
  const email = location.state.email;
  const detail = location.state.detail;

  const handleSubmit = async() =>{
    const data = {
        name: name,
        email: email,
        detail: detail
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch('http://localhost/shopping_r/contact.php', requestOptions);
            const jsonData = await response.json();
            console.log(jsonData)
            if(jsonData === true){
                navigate('/contact/result');
            }else{
                console.log('失敗')
            }

  }

  return (
    <div>
        <h3 className='title'>お問い合わせ内容の確認</h3>
        <p>お名前：{name}</p>
        <p>メールアドレス：{email}</p>
        <p>お問い合わせ内容：{detail}</p>
        <Button type="contactsubmit" name="item_image" variant="contained" onClick={handleSubmit}>
          送信
        </Button>
    </div>
  )
}

export default ContactSend