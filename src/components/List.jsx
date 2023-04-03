import React from 'react'
import axios from 'axios';
import Logout from './Logout'
import { useEffect, useState } from 'react'
import { Layout } from './layout/Layout';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const List = (props) => {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/list')
    .then(response => {
      setItemData(response.data);
      console.log(response.data);
    })
    .catch(error =>{
      console.log(error.response);
    });
  },[])
  return (
    <>
    <div className='title_list'>
      <div className='list_title'>商品リスト</div>

    </div>
    <div className='itemdata'>
      {itemData ?(
        itemData.map(item => (
          item.item_detail && (
          <Link to={'/detail'} style={{textDecoration: 'none'}}
                state={{detail: item.item_detail, id: item.item_id, image: item.item_image, name: item.item_name, price: item.item_price, flg: item.buy_flg, user_id: item.user_id, user_name: item.user_name, item_num: item.item_num, item_total_num: item.item_total_num}} key={item.item_id}>
          <div className='item'>
            <p className='itemname'>{item.item_name}</p>
            <img height="80" width="80" src={"http://localhost/public/images/" + item.item_image} alt={item.image} />
            <p>¥{Math.floor(item.item_price)}</p>
          </div>
          </Link>
        )))
      ) : (
        <p>loading</p>
      )}
      
    </div>
    </>
  )
}
export default List
