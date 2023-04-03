import React from 'react'
import { Link } from 'react-router-dom'

const MyPage = () => {
  return (
    <>
        <h3 className='title'>マイページ</h3>
        <div className='mypege'>
            <p>お名前：{sessionStorage.user_name}</p>
            <Link to={'/cart'} style={{textDecoration: 'none'}}>
                <p>検討中リスト</p>
            </Link>
            <Link to={'/add/list'} style={{textDecoration: 'none'}}>
                <p>出品リスト</p>
            </Link>
            <Link to={'/mypage/management'} style={{textDecoration: 'none'}}>
                <p>売上管理</p>
            </Link>
            <Link to={'/history'} style={{textDecoration: 'none'}}>
                <p>購入履歴</p>
            </Link>
        </div>
    </>
  )
}

export default MyPage