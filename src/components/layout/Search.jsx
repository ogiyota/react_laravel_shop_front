import { height } from '@mui/system';
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import Logout from '../Logout';
import {Button, TextField} from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



const Search = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [itemData, setItemData] = useState(null);
    const [ctg, setCtg] = useState();
    const [value, setValue] = useState('');
    const [sort, setSort] = useState('');

    const handleSortChange = (e) =>{
      setSort(e.target.value);
    }
  
    const handleSortSubmit = async(e) =>{
      e.preventDefault();
      const [sortctg, sortname] = sort.split(',');
      const sortData = {
          value : value,
          search : search,
          sortctg : sortctg,
          sortname: sortname
      }
      console.log(sortData)

      axios.post('http://127.0.0.1:8000/api/sort_search',sortData)
      .then(response =>{
        if(response.data.length > 0){
          console.log(response.data)
          navigate('/list/search', {state:{data: response.data}})
        }else{
          console.log(response.data);
        }
      })
      .catch(error =>{
        console.log(error.response);
      })
    }

    const handleCtgSubmit = (e) =>{
      e.preventDefault();
      const params = new URLSearchParams({
        ctg: value
      }).toString();

      axios.get(`http://127.0.0.1:8000/api/search?${params}`)
      .then(response =>{
        if(response.data.length > 0){
          console.log(response.data)
          setSearch('');
          navigate('/list/search', {state:{data: response.data}})
        }else{
          console.log(response.data);
        }
      })
      .catch(error =>{
        console.log(error.response);
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const params = new URLSearchParams({
        search: search //商品名
      }).toString();
    
      axios.get(`http://127.0.0.1:8000/api/search?${params}`)
        .then(response => {
          if (response.data.length > 0) {
            navigate('/list/search', { state: { data: response.data } })
          } else {
            console.log('なし');
          }
        })
        .catch(error => {
          console.log(error.response);
        })
    }

  return (
    <div className='search'>
        <p className='title_shopp'>PHPショップ</p>
        <form action="" className='searchber' onSubmit={handleSubmit}>
            <TextField
              className='searchfield'
              margin='normal'
              type='search'
              name='search'
              label='商品名を検索'
              variant='outlined'
              value={search} onChange={(e) => {setSearch(e.target.value)}}
              />
            <Button
             className='searchbutton'
             type="submit" 
             name="search" 
             variant="contained"
             endIcon={<SearchIcon/>}
             >検索</Button>
             </form>
             <form action="" className='ctg_search' onSubmit={handleCtgSubmit}>
                           <FormControl sx={{ m: 2, marginRight:0, minWidth: 180 }} >
      <InputLabel id="demo-select-small">カテゴリで検索</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label="カテゴリで検索"
        onChange={(e) => {setValue(e.target.value)}}
      >
        <MenuItem value={''}>全て</MenuItem>
        <MenuItem value={1}>野菜</MenuItem>
        <MenuItem value={2}>果物</MenuItem>
        <MenuItem value={3}>飲料</MenuItem>
        <MenuItem value={4}>家電</MenuItem>
        <MenuItem value={5}>雑貨</MenuItem>
      </Select>
    </FormControl>
    <Button
             className='searchbutton'
             type="submit" 
             name="search" 
             variant="contained"
             endIcon={<SearchIcon/>}
             >検索</Button>
                   <FormControl sx={{ marginTop:2,marginLeft:2, marginRight:1, minWidth: 130 }} >
      <InputLabel id="demo-select-small">並び替え</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={sort}
        label="並び替え"
        onChange={handleSortChange}
      >
        <MenuItem value="">
          <em>全て</em>
        </MenuItem>
        <MenuItem value={'item_price,DESC'}>価格高い順</MenuItem>
        <MenuItem value={'item_price,ASC'}>価格安い順</MenuItem>
        <MenuItem value={'created_at,DESC'}>新着順</MenuItem>
        <MenuItem value={'created_at,ASC'}>古い順</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ marginTop:3,minWidth: 70 }} >
      <Button type="submit" name="sort" variant="contained" onClick={handleSortSubmit}>
          並び替える
      </Button>
    </FormControl>
        </form>
        <Logout/>
    </div>
  )
}

export default Search