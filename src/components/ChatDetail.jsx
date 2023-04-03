import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const ChatDetail = () => {
    const location = useLocation();

    const [data, setData] = useState(null);
    const [chat, setChat] = useState('');
    const [errChat, setErrChat] = useState('');

    const chatUser = location.state.user_name
    const itemName = location.state.chat_name
    const userId = location.state.user_id
    const itemId = location.state.item_id
    const chatId = location.state.chat_id

    useEffect(() => {
        const chatData = {
            user_id: userId,
            my_id: sessionStorage.user_id,
            item_id: itemId,
            chat_id: chatId
        }

        axios.post('http://127.0.0.1:8000/api/chatDetail', chatData)
        .then(response =>{
            setData(response.data);
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error.response);
        })

      },[])

      const handleSubmit = async (e) => {
        e.preventDefault();
        //エラー文リセット
        setErrChat('');

    if(chat === ''){
        setErrChat('内容を入力してください')
    }
    if(chat !== ''){
        const userData = {
          user_name: sessionStorage.user_name,
          chat: chat,
          user_id: sessionStorage.user_id,
          chat_id: chatId
        };

        axios.post('http://127.0.0.1:8000/api/addChat', userData)
        .then(response =>{
            setData(response.data);
            toast.success('書き込みが完了しました',{
              className:'toast-message'
            });
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error.response);
        })


      }
    }
  return (
    <div>
      <ToastContainer hideProgressBar={true}/>
        <h3 className='title'>{chatUser}さんと{sessionStorage.user_name}の会話</h3>
        <h4>{itemName}</h4>
        <div className='boarddata'>
            {data ?(
                data.map(chat => (
                    <ul className={Number(chat.user_id) === Number(sessionStorage.user_id) ? 'right' : 'left'} key={chat.chat_id}>
                        <li className={Number(chat.user_id) === Number(sessionStorage.user_id) ? 'nameright' : 'nameleft'}>{chat.user_name}</li>
                        <li className={Number(chat.user_id) === Number(sessionStorage.user_id) ? 'nameright' : 'nameleft'}>{chat.board}</li>
                    </ul>
                ))
            ) : (
            <p>loading</p>
        )}
        </div>
        <form className='boardform' action="" method='post' onSubmit={handleSubmit}>
            <TextField
              className='boardinput'
              margin='normal'
              type='textarea'
              multiline
              rows={5}
              name='board'
              label='投稿内容'
              variant='outlined'
              value={chat} onChange={(e) => {setChat(e.target.value)}}
            />
            <Button
             className='boardbutton'
             type="submit" 
             name="chat" 
             variant="contained">書き込む</Button>
        </form>
        <p>{errChat}</p>
    </div>
  )
}

export default ChatDetail