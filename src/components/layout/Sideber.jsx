import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Link } from 'react-router-dom';

const Sideber = () => {
  return (
    <div className='sideber'>
        <Link to={'/mypage'} style={{textDecoration: 'none'}}>
        <ul className="data">
            <li className="icon">{<StoreIcon/>}</li>
            <li className='iconname'>マイページ</li>
        </ul>
        </Link>
        <Link to={'/list'} style={{textDecoration: 'none'}}>
        <ul className="data">
            <li className="icon">{<StoreIcon/>}</li>
            <li className='iconname'>商品一覧</li>
        </ul>
        </Link>
        <Link to={'/cart'} style={{textDecoration: 'none'}}>
        <ul className="data">
            <li className="icon">{<ShoppingCartIcon/>}</li>
            <li className='iconname'>検討中リスト</li>
        </ul>
        </Link>
        <Link to={'/add'} style={{textDecoration: 'none'}}>
        <ul className="data">
            <li className="icon">{<AddCardIcon/>}</li>
            <li className='iconname'>商品登録</li>
        </ul>
        </Link>
        <Link to={'/chat'} style={{textDecoration: 'none'}}>
        <ul className="data">
            <li className="icon">{<AddCardIcon/>}</li>
            <li className='iconname'>やり取り</li>
        </ul>
        </Link>
        <Link to={'/contact'} style={{textDecoration: 'none'}}>
        <ul className="data">
            <li className="icon">{<AddCardIcon/>}</li>
            <li className='iconname'>お問い合わせ</li>
        </ul>
        </Link>
    </div>
  )
}

export default Sideber