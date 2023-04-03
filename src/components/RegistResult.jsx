import React from 'react'
import { Link } from 'react-router-dom'

const RgistResult = (props) => {
  return (
    <>
      <p>登録が完了しました</p>
      <Link to={'/list/'}>サイト内へ移動</Link>
    </>
  )
}

export default RgistResult