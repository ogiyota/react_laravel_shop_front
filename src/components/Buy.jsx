import React from 'react'
import axios from 'axios';
import { useLocation,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import Modal from 'react-modal';

const Buy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(location.state.user_id);
    function closeModal() {
        setIsModalOpen(false);
      }

    const handleBuySubmit = (e) =>{
      setIsModalOpen(true);
    }

    const handleSubmit = () => {
        const data = {
            item_id : location.state.id,
            item_name :location.state.name,
            item_count :location.state.count,
            total_price : location.state.total,
            user_id : sessionStorage.user_id,
            item_num : location.state.item_num,
            buy_num : location.state.buy_num
        }
        axios.put('http://127.0.0.1:8000/api/buy',data)
        .then(response =>{
          console.log(response.data);
          navigate('/buy/result')
        })
        .catch(error =>{
          console.log(error.response);
        })
    }
  return (
    <div>
        <h3 className='title'>購入確認</h3>
        <p>商品名：{location.state.name}</p>
        <p>購入個数：{location.state.count}</p>
        <p>合計金額：¥{Math.floor(location.state.total)}</p>
        <div>
            <p>上記の商品を購入します。よろしければ購入手続き完了ボタンを押してください</p>
            <Button type="submit" className='buy_button' variant="contained" onClick={handleBuySubmit}>
            購入する
            </Button>
        </div>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <p className='confirmword'>購入しますか？</p>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
      <Button type="submit" name="oncart" variant="contained" onClick={closeModal} style={{ marginRight: '3rem' }}>
        いいえ
      </Button>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        はい
      </Button>
    </Box> 
      </Modal>
    </div>
    
  )
}

export default Buy