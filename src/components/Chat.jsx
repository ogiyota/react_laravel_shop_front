import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const Chat = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const boardData = {
            user_id : sessionStorage.user_id
        }

        axios.post('http://127.0.0.1:8000/api/chatList', boardData)
        .then(response =>{
            setData(response.data);
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error.response);
        })

      },[])

  return (
    <div>
        <h3 className='title'>やり取り一覧</h3>
        <div className='itemdata'>
                    <table>
                        <tr>
                            <th className='item_table'>チャットユーザー</th>
                            <th>商品名</th>
                            <th>価格</th>
                        </tr>
                        {data ?(
                data.map(chat => (
                            <tr key={chat.chat_id}>
                              <Link to={'/chat/' + chat.user_id + '/' + chat.chat_user_id + '/' + chat.item_id} style={{textDecoration: 'none'}}
                                state={{chat_name: chat.item_name, user_name: Number(chat.chat_user_id) !== Number(sessionStorage.user_id) ? chat.chat_user_name : chat.user_name,
                                image: chat.item_image, price: chat.item_price, item_id: chat.item_id, chat_id: chat.chat_id,
                                user_id: Number(chat.chat_user_id) !== Number(sessionStorage.user_id) ? chat.chat_user_id : chat.user_id}}
                              >
                              <td className='user_name'>{Number(chat.chat_user_id) !== Number(sessionStorage.user_id) ? chat.chat_user_name : chat.user_name}さんとの会話</td></Link>
                              <td><img height="60" width="60" src={"http://localhost/public/images/"+chat.item_image} alt={chat.item_name} /><p>{chat.item_name}</p></td>
                              <td>¥{Math.floor(chat.item_price)}</td>
                            </tr>
                ))
            ) : (
            <p>loading</p>
        )}
        </table>
        </div>
    </div>
  )
}

export default Chat