import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React from 'react'
import { useState, useEffect } from 'react'

const SalesManagement = () => {

    const [data, setData] = useState();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const downloadCsv = (csvData) => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sales-data.csv';
        link.click();
        URL.revokeObjectURL(url);
      }


    const handleYearChange = (e) => {
        setYear(e.target.value);
      };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
      };

    const handleSubmit = async() => {
        console.log(year+'年'+month+'月')
        const manaData = {
            year : year,
            month : month,
            user_id : sessionStorage.user_id
        }
        console.log(manaData)
        axios.post('http://127.0.0.1:8000/api/getManagement',manaData)
        .then(response =>{
          setData(response.data);
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error.response);
        })
    }

    const handleCsvSubmit = () =>{
            const salesData = [
              ['商品名', '売上個数', '売上金額', '成約日時'],
              ...data.map(datas =>[
                [datas.item_name, datas.buy_num, datas.item_price, (new Date(datas.created_at)).toLocaleString()]
            ]),[]
            ];

        const csvData = salesData.map(row => row.join(',')).join('\n');
        downloadCsv(csvData);
    }

    useEffect(() =>{
            const datas = {
                user_id: sessionStorage.user_id
                }
            axios.post('http://127.0.0.1:8000/api/management',datas)
            .then(response =>{
              setData(response.data);
              console.log(response.data);
            })
            .catch(error =>{
              console.log(error.response);
            })
    },[])
  return (
    <>
        <h3 className='title'>売り上げ管理</h3>
        <div>
            <div className='mana_data'>
        <FormControl sx={{ m: 2, minWidth: 90 }} >
      <InputLabel id="demo-select-small">年</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={year}
        label="年"
        onChange={handleYearChange}
      >
        <MenuItem value="">
          <em>全て</em>
        </MenuItem>
        <MenuItem value={2022}>2022年</MenuItem>
        <MenuItem value={2023}>2023年</MenuItem>
        <MenuItem value={2024}>2024年</MenuItem>
      </Select>
    </FormControl>
        <FormControl sx={{ m: 2, minWidth: 90 }} >
      <InputLabel id="demo-select-small">月</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={month}
        label="月"
        onChange={handleMonthChange}
      >
        <MenuItem value="">
          <em>全て</em>
        </MenuItem>
        <MenuItem value={1}>１月</MenuItem>
        <MenuItem value={2}>２月</MenuItem>
        <MenuItem value={3}>３月</MenuItem>
        <MenuItem value={4}>４月</MenuItem>
        <MenuItem value={5}>５月</MenuItem>
        <MenuItem value={6}>６月</MenuItem>
        <MenuItem value={7}>７月</MenuItem>
        <MenuItem value={8}>８月</MenuItem>
        <MenuItem value={9}>９月</MenuItem>
        <MenuItem value={10}>１０月</MenuItem>
        <MenuItem value={11}>１１月</MenuItem>
        <MenuItem value={12}>１２月</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ m: 2, minWidth: 90 }} >
    <Button type="submit" name="item_image" variant="contained" onClick={handleSubmit}>
                  絞り込み
                </Button>
                </FormControl>
                <FormControl sx={{ m: 2, minWidth: 90 }} >
    <Button type="submit" name="item_image" variant="contained" onClick={handleCsvSubmit}>
                  CSVデータでダウンロード
                </Button>
                </FormControl>
                </div>
            <table>
                <tr>
                    <th>商品名</th>
                    <th>売り上げ個数</th>
                    <th>売り上げ金額</th>
                    <th>購入された日時</th>
                </tr>
                {data ?(
                    data.map(i =>(
                        <tr>
                            <td>{i.item_name}</td>
                            <td>{i.buy_num}</td>
                            <td>¥{Math.floor(i.item_price)}</td>
                            <td className='date'>{(new Date(i.created_at)).toLocaleString()}</td>
                        </tr>
                    ))
                ):(
                    <p>loading</p>
                )}
            </table>
        </div>
    </>
  )
}

export default SalesManagement