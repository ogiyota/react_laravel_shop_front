import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h3>ショッピングサイトへようこそ</h3>
        <div className="whitch">
          <p>登録がお済みの方はこちらへ</p>
          <p><Link to={'/login/'}>ログイン</Link></p>
        </div>
        <div className="whitch">
          <p>登録がお済みではない方</p>
          <p><Link to={'/regist/'}>新規登録</Link></p>
        </div>
    </div>
  )
}

export default Home