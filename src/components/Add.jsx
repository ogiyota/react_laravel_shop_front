import React, { useState } from 'react'
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

const Add = () => {

  const navigate = useNavigate();

  const [itemName, setItemName] = useState('')
  const [detail, setDetail] = useState('');
  const [ctg, setCtg] = useState('');
  const [itemNum, setItemNum] = useState(1);
  const [image, setImage] = useState(null);
  const [itemPrice, setItemPrice] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageName, setImageName] = useState('');

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
      setImageName (response.data)
      if(response.data !== ''){
        const data = {
          item_name: itemName,
          item_detail: detail,
          item_image: response.data,
          item_price: itemPrice,
          item_num: itemNum,
          item_total_num: itemNum,
          ctg_id: ctg,
          user_id: sessionStorage.user_id,
          user_name: sessionStorage.user_name
        }
        console.log(data);

        axios.post('http://127.0.0.1:8000/api/addProduct',data)
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

      
      // function send(){
      // const data = {
      //   item_name: itemName,
      //   item_detail: detail,
      //   item_image: imageName,
      //   item_price: itemPrice,
      //   item_num: itemNum,
      //   item_total_num: itemNum,
      //   ctg_id: ctg,
      //   user_id: sessionStorage.user_id,
      //   user_name: sessionStorage.user_name
      // }

      // axios.post('http://127.0.0.1:8000/api/addProduct',data)
      // .then(response2 =>{
      //   if(response2.data === true){
      //     navigate('/cart');
      //   }else{
      //     toast.error('失敗しました');
      //   }
      // })
      // .catch(error =>{
      //   console.log(error.response2);
      // })
      // }

      
  
      // const requestOptions2 = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // };
      // console.log(requestOptions2)
      // const response2 = await fetch('http://localhost/shopping_r/add.php', requestOptions2);
      //         const jsonData2 = await response2.json();
      //         if(jsonData2 === true){
      //           navigate('/list');
      //         }
    }

    
  
  return (
    <div className='add'>
      <h3 className='title'>商品登録</h3>
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
                  登録
                </Button>
                <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <p className='confirmword'>この内容で商品の登録をします。よろしいですか？</p>
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

export default Add