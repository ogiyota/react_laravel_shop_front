import React from 'react'
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

const Board = () => {
    const [board, setBoard] = useState('');
    const [errBoard, setErrBoard] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch('http://localhost/shopping_r/board.php');
        const jsonData = await response.json();
        setData(jsonData);
        }
        fetchData();
      },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //エラー文リセット
        setErrBoard('');

    if(board === ''){
        setErrBoard('内容を入力してください')
    }
    if(board !== ''){
        const userData = {
          user_name: sessionStorage.user_name,
          board: board,
          user_id: sessionStorage.user_id
        };

        //phpへデータ送信準備
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        };

        //書き込みデータを送信し、全てのデータをとってくる
        const response2 = await fetch('http://localhost/shopping_r/board.php', requestOptions);
        const jsonData2 = await response2.json();
        setData(jsonData2);
      }
    }
  return (
    <div className='board'>
        <h3 className='title'>掲示板</h3>
        <div className='boarddata'>
            {data ?(
                data.map(board => (
                    <ul className={board.user_id === sessionStorage.user_id ? 'right' : 'left'} key={board.board_id}>
                        <li className={board.user_id === sessionStorage.user_id ? 'nameright' : 'nameleft'} key={board.board_id}>{board.user_name}</li>
                        <li className={board.user_id === sessionStorage.user_id ? 'nameright' : 'nameleft'} key={board.board_id}>{board.board}</li>
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
              value={board} onChange={(e) => {setBoard(e.target.value)}}
            />
            <Button
             className='boardbutton'
             type="submit" 
             name="board" 
             variant="contained">書き込む</Button>
        </form>
        <p>{errBoard}</p>
    </div>
  )
}

export default Board