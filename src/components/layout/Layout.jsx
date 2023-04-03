import React from 'react'
import './layout.css';
import Sideber from './Sideber';
import List from '../List';
import Search from './Search';

const Layout = (props) => {
  return (
    <div>
      <Search/>
    <div className='layout'>
      <Sideber/>
      <div className='main'>
        {props.child}
      </div>
    </div>
    </div>
  )
}

export default Layout
