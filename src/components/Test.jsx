import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [a ,setA] = useState();
    const [flg, setFlg] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email : email,
        }

        axios.post('http://127.0.0.1:8000/api/list',data)
        .then(response => {
        const csrfToken =  response.data;
        console.log(csrfToken);
        // 取得したCSRFトークンを使用してリクエストを送信する
      })
      .catch(error => {
        console.log(error);
      });


    }


    // if(flg === false){
    //     axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
    //         console.log(response)
    //     });
    //     setFlg(true);
    // }



    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     const csrfToken = await fetchCsrfToken();
    //     const formData = new FormData();
    //     formData.append('_token', csrfToken);
    //     formData.append('data', productId);
    //     // 他のフォームデータも追加
    //     const response = await fetch('http://127.0.0.1:8000/api/test/2', {
    //         method: 'GET',

    //         body: formData
    //     });
    //     console.log(response);


    // }
    
    // async function fetchCsrfToken() {
    //     const response = await fetch('http://127.0.0.1:8000/api/csrf_token');
    //     const token = await response.text();
    //     return token;
    // }

//   const [a, setA] = useState([]);
//   const data = 1;

//   useEffect(() => {

//     console.log(1);

    
//   }, []);

//   const CSRF_TOKEN_URL = 'http://127.0.0.1:8000/api/csrf_token';
//   const data2 = {id:1};
//   async function getCsrfToken() {
//     const response = await axios.get(CSRF_TOKEN_URL);
//     console.log(response.data.csrf_token);
//     return response.data.csrf_token;
//   }

//   async function registerProduct() {
//     const csrfToken = await getCsrfToken();
//     const response = await axios.post('http://127.0.0.1:8000/api/test', data2, {
//       headers: {
//         'X-CSRF-TOKEN': csrfToken, // CSRFトークンをヘッダーに含める
//       },
//     });
//     console.log(response.data);
//      setA(response.data);
//   }


  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" onChange={(e) =>setEmail(e.target.value)} value={email} />
            <input type="password" onChange={(e) =>setPassword(e.target.value)} value={password} />
            <button>送信</button>
        </form>
    </div>
  );
}

export default App;