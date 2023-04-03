import React from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Detail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [num, setNum] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const detail = location.state.detail
  const id = location.state.id
  const name = location.state.name
  const image = location.state.image 
  const price = location.state.price
  const user_id = location.state.user_id
  const user_name = location.state.user_name
  const flg = location.state.flg

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleCreateChatSubmit = async() =>{
    const chatData = {
      item_name: name,
      item_detail: detail,
      item_image: image,
      item_price: price,
      item_id: id,
      user_id: sessionStorage.user_id,
      user_name: sessionStorage.user_name,
      chat_user_name: user_name,
      chat_user_id: user_id,
      flg: flg
    }

  axios.post('http://127.0.0.1:8000/api/createChat',chatData)
  .then(response =>{
    if(response.data === true){
      navigate('/chat');
    }else{
      toast.error('失敗しました');
    }
  })
  .catch(error =>{
    console.log(error.response);
  })

  }

  const handleOnCart =async() =>{
    const datas = {
      item_name: name,
      item_detail: detail,
      item_image: image,
      item_price: price,
      item_id: id,
      item_num: num,
      item_total_num:location.state.item_total_num,
      user_id: sessionStorage.user_id,
    }

    axios.post('http://127.0.0.1:8000/api/addcart', datas)
    .then(response =>{
      console.log(response.data);
      if(response.data === true){
        navigate('/cart');
      }else{
        toast.error('失敗しました');
      }
    })

  }

  const handleBackSubmit = (e) =>{
    e.preventDefault();
    navigate('/list');
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(Number(num) > Number(location.state.item_total_num) || Number(num) <= 0){
      toast.error('正しい個数を入力して下さい');
    }else{
      setIsModalOpen(true);
    }
  }
  return (
    <>
    <ToastContainer hideProgressBar={true}/>
    <h3 className='title'>商品詳細</h3>
    <p>出品者：{user_name}さん</p>
    <Button type="submit" variant="contained" onClick={handleCreateChatSubmit} style={{ marginRight: '3rem' }}>
        この商品についてのチャットを開始する
      </Button>
    <div className='detail'>
      <p>{name}</p>
      <p>¥{Math.floor(price)}</p>
      <img height="200" width="200" src={"http://localhost/public/images/" + image} alt={name} />
      <p className='detailword'>{detail}</p>
      <TextField
      className='text'
              margin='normal'
              type='number'
              name='num'
              label={'購入個数（在庫数'+ location.state.item_total_num +'）'}
              inputProps={{ min:1, max: location.state.item_total_num }}
              variant='standard'
              value={num} onChange={(e) => setNum(e.target.value)}
              />
      <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
      <Button type="submit" variant="contained" onClick={handleBackSubmit} style={{ marginRight: '3rem' }}>
        一覧に戻る
      </Button>
      <Button type="submit" name="oncart" variant="contained" onClick={handleSubmit}>
        検討中リストに追加
      </Button>
    </Box>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <p className='confirmword'>{name}を検討中リストに追加します。</p>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop={2} marginBottom={5}>
      <Button type="submit" name="oncart" variant="contained" onClick={closeModal} style={{ marginRight: '3rem' }}>
        いいえ
      </Button>
      <Button type="submit" variant="contained" onClick={handleOnCart}>
        はい
      </Button>
    </Box> 
      </Modal>
      <div className='space'></div>
      </div>
    </>
  )
}

export default Detail


