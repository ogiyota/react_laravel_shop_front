import React, { useState } from 'react'
import axios from 'axios';
import './index.css'
import {Button, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

const Regist = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userName, setUserName] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState(''); 
    const [errPassMsg, setErrPassMsg] = useState(''); 
    const [errRegist, setErrRegist] = useState(''); 
    const [registData, setregistData] = useState(null);

        const handleSubmit = async (e) => {
            e.preventDefault();
            //エラー文リセット
            setErrEmailMsg('')
            setErrPassMsg('')
    
        if(email === ''){
            setErrEmailMsg('メールアドレスを入力してください')
        }
        if(pass === ''){
            setErrPassMsg('パスワードを入力してください')
        }
        if(email !== '' && pass !== ''){
            const userData = {
              name : userName,
              email: email,
              password: pass,
              password_confirmation: pass
            };
    
            //phpへデータ送信準備
            axios.post('http://127.0.0.1:8000/api/register',userData)
            .then(response => {
            setregistData(response.data); 
            if(registData === true){
                navigate('/complateRegist');
            }
          })
          .catch(error => {
            console.log(error.response.data);
          });
        }
    }

  return (
    <>
        <form className="form" action="" method="post" onSubmit={handleSubmit}>
            <TextField
            margin='normal'
            type='user_name'
            name='user_name'
            label='name'
            variant='standard'
            value={userName} onChange={(e) => setUserName(e.target.value)}
            />
            <p className='err_msg'>{errEmailMsg}</p>
            <TextField
            margin='normal'
            type='email'
            name='email'
            label='email'
            variant='standard'
            value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <p className='err_msg'>{errEmailMsg}</p>
            <TextField
            margin='normal'
            type='password'
            name='password'
            label='password'
            variant='standard'
            value={pass} onChange={(e) => setPass(e.target.value)}
            />
        <br/><br/>
        <p className='err_msg'>{errPassMsg}</p>
        <Button
            type="submit" 
            name="send" 
            variant="contained"
            endIcon={<SendIcon />}>登録</Button>
            {errRegist}
        </form>
    </>
  )
}

export default Regist