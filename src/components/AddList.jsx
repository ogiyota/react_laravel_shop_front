import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddList = () => {

    const [addList, setAddList] = useState(null);

    useEffect(() => {
            const data = {
                user_id: sessionStorage.user_id
            }
            axios.post('http://127.0.0.1:8000/api/addList',data)
            .then(response =>{
              setAddList(response.data);
              console.log(response.data);
            })
            .catch(error =>{
              console.log(error.response);
            })
            
      },[])
  return (
    <>
      <h3 className='title'>登録商品一覧</h3>
      <div className='itemdata'>
      {addList ?(
        addList.map(item => (
          item.item_detail && (
          <Link to={'/detail'}
                state={{detail: item.item_detail, id: item.item_id, image: item.item_image, name: item.item_name, price: item.item_price}} key={item.item_id}>
          <div className='item'>
            <p className='itemname'>{item.item_name}</p>
            <img height="80" width="80" src={"http://localhost/public/images/" + item.item_image} alt={item.image} />
            <p>¥{Math.floor(item.item_price)}</p>
          </div>
          <Link to={'/edit/item'}
                state={{item_id: item.item_id, item_name:item.item_name, item_price: item.item_price, detail:item.item_detail}}>編集</Link>
          </Link>
        )))
      ) : (
        <p>loading</p>
      )}
    </div>
    </>
  )
}

export default AddList