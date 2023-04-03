import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import Modal from 'react-modal';
import { Dataset } from '@mui/icons-material';


const Cart = () => {

  let item_sum = 0;
  let total_sum = 0;

  const [id, setId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [num, setNum] = useState(Array(data.length).fill(1));
  const [modalName, setModalName] = useState('');
  const [change, setChanege] = useState(true);
  const [itemId, setItemId] = useState('');
  const [number, setNumber] = useState();

  useEffect(() => {
      const datas = {
        user_id: sessionStorage.user_id
      }
      axios.post('http://127.0.0.1:8000/api/cartList',datas)//カート取得
      .then(response =>{
        setData(response.data);

        for(let i = 0; i < response.data.length; i++){
          item_sum = item_sum + Number(response.data[i]['item_count']);
          total_sum = total_sum + Number(response.data[i]['total']);
        }
        setSum(0 + item_sum);
        setSumPrice(0 + total_sum);
        item_sum = 0;
        total_sum = 0;
      })
      .catch(error =>{
        console.log(error.response);
      })

  },[])

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleUpdateSubmit = (e) =>{
    setItemId(e.target.name)
    setModalName(number + 'に変更しますか？')
    setIsModalOpen(true);
    setChanege(false);
  }

  const handleDeleteSubmit = (e) =>{
    setModalName('削除しますか？')
    setIsModalOpen(true);
    setId(e.target.name);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setChanege(true);
    if(change === true){
      const deleteData = {
        item_id: id,
        user_id: sessionStorage.user_id
      }
      //削除
      axios.put('http://127.0.0.1:8000/api/deleteCart',deleteData)
      .then(response =>{
        if(response.data === true){
          setIsModalOpen(false);
            const datas = {
              user_id: sessionStorage.user_id
            }
            axios.post('http://127.0.0.1:8000/api/cartList',datas)//カート取得
            .then(response =>{
              setData(response.data);
              for(let i = 0; i < response.data.length; i++){
                item_sum = item_sum + Number(response.data[i]['item_count']);
                total_sum = total_sum + Number(response.data[i]['total']);
              }
              setSum(0 + item_sum);
              setSumPrice(0 + total_sum);
              item_sum = 0;
              total_sum = 0;
            })
            .catch(error =>{
              console.log(error.response);
            })
    
        }
      })
    }else{
      const changeData = {
        user_id : sessionStorage.user_id,
        item_num : number,
        item_id : itemId
      }

      axios.put('http://127.0.0.1:8000/api/changeCart',changeData)//カート取得
      .then(response =>{
        if(response.data === true){
          setIsModalOpen(false);
          async function fetchData() {
            const datas = {
              user_id: sessionStorage.user_id
            }
            axios.post('http://127.0.0.1:8000/api/cartList',datas)//カート取得
            .then(response =>{
              setData(response.data);
          setData(response.data);
        })
        .catch(error =>{
          console.log(error.response.data);
        })
          for(let i = 0; i < response.data.length; i++){
            item_sum = item_sum + Number(response.data[i]['item_count']);
            total_sum = total_sum + Number(response.data[i]['total']);
            console.log(item_sum)
          }
          setSum(0 + item_sum);
          setSumPrice(0 + total_sum);
          item_sum = 0;
          total_sum = 0;
          }
          fetchData();
        }
      })
      .catch(error =>{
        console.log(error.response);
      })
    }
  }
  console.log(data)
  return (
    <>
    <h3 className='title'>検討中リスト</h3>
    <div>
      <p>リスト内の商品数：{sum}</p>
      <p>リスト内の合計金額：¥{sumPrice}</p>
    </div>
    <div className='itemdata'>
      <table>
        <tr>
          <th className='item_table'>商品名</th>
          <th>単価</th>
          <th>注文数</th>
          <th>注文数変更</th>
          <th>小計</th>
          <th>削除</th>
          <th>購入</th>
        </tr>
      {data ?(
        data.map((item,index) => (
            <tr key={item.cart_id}>
              <Link to={'/detail'}
                    state={{detail: item.item_detail, id: item.item_id, image: item.item_image, name: item.item_name, price: item.item_price, item_num: item.item_num, item_total_num: item.item_total_num}}>
                <td><img height="60" width="60" src={"http://localhost/public/images/" + item.item_image} alt={item.item_image} /><p>{item.item_name}</p></td>
              </Link>
                <td>¥{Math.floor(item.item_price)}</td>
                <td>{item.item_count}</td><td>
                <TextField
              className='num'
              margin='normal'
              type='number'
              name='num'
              label={'個数（在庫数'+ item.item_total_num + '）'}
              inputProps={{ min:1, max: item.item_total_num }}
              variant='standard'
              value={num[index] ?? item.item_count} onChange={(e) => {
                const newNum = [...num];
                newNum[index] = e.target.value;
                setNumber(e.target.value)
                setNum(newNum);}}
              />
              <Button type="submit" name={item.item_id} variant="contained" onClick={handleUpdateSubmit}>
                  変更
                </Button></td>
                <td>¥{Math.floor(item.total)}</td>
                <td>
                <Button type="submit" name={item.item_id} variant="contained" onClick={handleDeleteSubmit}>
                  削除
                </Button>
                </td>
                <td>
                <div>
                  <Link to={'/buy'} style={{textDecoration: 'none'}}
                        state={{id: item.item_id, user_id:item.user_id, image: item.item_image, name: item.item_name, price: item.item_price,
                                count: item.item_count, total: item.total, item_num: item.item_num, buy_num: item.buy_num}}>
                  <Button type="submit" className='buy_button' variant="contained">
                    購入する
                  </Button>
                  </Link>
                </div>
                </td>
            </tr>
        ))
      ):(
        <p>loading</p>
     )}
     </table>
     <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <p className='confirmword'>{modalName}</p>
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
    </>
  )
}

export default Cart