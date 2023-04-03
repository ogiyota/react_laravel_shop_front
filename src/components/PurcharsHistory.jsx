import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const PurcharsHistory = () => {

    const [data, setData] = useState();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [history, setHistory] = useState();

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
        const hisData = {
            year : year,
            month : month,
            user_id : sessionStorage.user_id
        }
        axios.post('http://127.0.0.1:8000/api/getHistory',hisData)
        .then(response =>{
          setData(response.data);
          setHistory(response.data);
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

    useEffect(() => {
        const datas = {
            user_id: sessionStorage.user_id
            }

        axios.post('http://127.0.0.1:8000/api/history',datas)
        .then(response =>{
          setData(response.data);
          setHistory(response.data);
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error.response.data);
        })
      },[])
  return (
    <>
        <h3 className='title'>購入履歴</h3>
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
                <th>購入個数</th>
                <th>合計金額</th>
                <th>購入日時</th>
            </tr>
            {history ?(
                history.map(log =>(
                    <tr>
                        <td>{log.item_name}</td>
                        <td>{log.buy_num}</td>
                        <td>¥{Math.floor(log.item_price)}</td>
                        <td className='date'>{(new Date(log.created_at)).toLocaleString()}</td>
                    </tr>
                ))
            ):(<p>Loadig</p>
            )}
        </table>
    </>
  )
}

export default PurcharsHistory