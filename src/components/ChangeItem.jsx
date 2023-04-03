import React, { useState } from 'react'
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeItem = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const item_id = location.state.item_id;
  console.log(item_id)

  const [itemName, setItemName] = useState(location.state.item_name)
  const [detail, setDetail] = useState(location.state.detail);
  const [ctg, setCtg] = useState('');
  const [itemNum, setItemNum] = useState(1);
  const [image, setImage] = useState(null);
  const [itemPrice, setItemPrice] = useState(Math.floor(location.state.item_price));
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }
  const handleModalSubmit = () =>{
    if(itemName !== '' && ctg !== '' && detail !== '' && itemPrice !== ''){
    setIsModalOpen(true);
    }else{
      setErrMsg('全て必須項目です。入力してください。')
    }
  }
  const handleChange = (e) => {
    setCtg(e.target.value);
  };
  const handleOnAddImage = (e) =>{
    setImage(e.target.files[0]);
  }
  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('item_image', image);

    axios.post('http://127.0.0.1:8000/api/uploadImage',formData)
    .then(response =>{
      if(response.data !== ''){
        const data = {
          item_id: item_id,
          item_name: itemName,
          item_detail: detail,
          item_image: response.data,
          item_price: itemPrice,
          item_total_num: itemNum,
          ctg_id: ctg,
        }
        console.log(data);

        axios.put('http://127.0.0.1:8000/api/changeProduct',data)
        .then(response =>{
          if(response.data === true){
            navigate('/add/list');
          }else{
            toast.error('失敗しました');
          }
        })
        .catch(error =>{
          console.log(error.response);
        })
      }else{
        toast.error('失敗しました');
      }
    })
    .catch(error =>{
      console.log(error.response);
    })
  }
   

    
  
  return (
    <div className='add'>
      <h3 className='title'>登録商品情報の変更</h3>
      <p>{errMsg}</p>
      <TextField
              className='ainput'
              margin='normal'
              type='text'
              rows={1}
              name='item_name'
              label='商品名'
              variant='outlined'
              value={itemName} onChange={handleNameChange}
            />
      <FormControl sx={{ m: 2, minWidth: 140 }} >
      <InputLabel id="demo-select-small">商品カテゴリ</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={ctg}
        label="商品カテゴリ"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>野菜</MenuItem>
        <MenuItem value={2}>果物</MenuItem>
        <MenuItem value={3}>飲料</MenuItem>
        <MenuItem value={4}>家電</MenuItem>
        <MenuItem value={5}>雑貨</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ m: 2, minWidth: 140 }} >
    <TextField
              className='input'

              type='text'
              name='item_price'
              label='値段'
              variant='outlined'
              value={itemPrice} onChange={(e) => {setItemPrice(e.target.value)}}
            />
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 140 }} >
        <TextField
              className='input'
              type='number'
              name='item_num'
              label='個数'
              variant='outlined'
              value={itemNum} onChange={(e) => {setItemNum(e.target.value)}}
            />
    </FormControl>
    <TextField
              className='detailinput'
              margin='normal'
              type='textarea'
              multiline
              rows={5}
              name='detail'
              label='商品説明'
              variant='outlined'
              value={detail} onChange={(e) => {setDetail(e.target.value)}}
            />
                  <input
                  className='file'
  type="file"
  multiple
  accept="image/*,.png,.jpg,.jpeg,.gif"
  onChange={(e) =>
    handleOnAddImage(e)
  }></input>
                  <Button type="submit" name="item_image" variant="contained" onClick={handleModalSubmit}>
                  変更
                </Button>
                <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <p className='confirmword'>この内容で商品の変更をします。よろしいですか？</p>
        <p>商品名:{itemName}</p>
        <p>価格:{itemPrice}</p>
        <p>商品説明：{detail}</p>
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

export default ChangeItem