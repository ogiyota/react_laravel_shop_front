import React from 'react'
import Logout from './Logout'
import { useEffect, useState } from 'react'
import { Layout } from './layout/Layout';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResult = () => {
    const [itemData, setItemData] = useState(null);
    const location = useLocation();

    const data = location.state.data

    console.log(data)

    return (
      <>
      <h3 className='title'>商品リスト</h3>
      <div className='itemdata'>
        {data ?(
          data.map(item => (
            item.item_detail && (
            <Link to={'/detail'}
                  state={{detail: item.item_detail, id: item.item_id, image: item.item_image, name: item.item_name, price: item.item_price}} key={item.item_id}>
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

export default SearchResult