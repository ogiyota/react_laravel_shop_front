import React from 'react'
import axios from 'axios';
import './index.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';



const LoginForm = () => { 
    const navigate = useNavigate();
    const [loginFlg, setLoginFlg] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState(''); 
    const [errPassMsg, setErrPassMsg] = useState(''); 
    const [errLoginMsg, setErrLoginMsg] = useState('');
    const [loginData, setLoginData] = useState(null);

    useEffect(()=>{
        const session = sessionStorage.getItem('session_key');
        if(session !== null){
            navigate('/list');
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        //エラー文リセット
        setErrEmailMsg('')
        setErrPassMsg('')
        setErrLoginMsg('')

    if(email === ''){
        setErrEmailMsg('メールアドレスを入力してください')
    }
    if(pass === ''){
        setErrPassMsg('パスワードを入力してください')
    }
    if(email !== '' && pass !== ''){
        const userData = {
          email: email,
          password: pass
        };

        axios.post('http://127.0.0.1:8000/api/login',userData)
        .then(response => {
        setLoginData(response.data);
        
        console.log(response.data);
        sessionStorage.setItem('user_id',response.data.user_id);
        sessionStorage.setItem('user_name',response.data.name);
        // sessionStorage.setItem('user_id', jsonData.id);
        setLoginFlg(!loginFlg)
        navigate('/list');
      })
      .catch(error => {
        setErrLoginMsg('メールアドレスとパスワードが一致しません')
      });
        ///返ってきた情報を元にログインの振り分け
      }
    }
        return (
        <>
            <form className="form" method="post" onSubmit={handleSubmit}>
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
            <p className='err_msg'>{errLoginMsg}</p>
            <Button
             type="submit" 
             name="send" 
             variant="contained"
             endIcon={<SendIcon />}>ログイン</Button>
            </form>
            <div>
                新規登録は<Link to={'/regist/'}>こちら</Link>
            </div>
        </>
    )
}
export default LoginForm