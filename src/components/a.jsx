import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';

export default function YourComponent() {
    
  const [data, setData] = useState([
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Alice', age: 20 },
    { id: 4, name: 'Lisa', age: 35 },
    { id: 5, name: 'Tim', age: 28 },
    { id: 6, name: 'Sarah', age: 22 },
    { id: 7, name: 'Tom', age: 29 },
    { id: 8, name: 'Mike', age: 27 },
    { id: 9, name: 'Kate', age: 33 },
    { id: 10, name: 'Emily', age: 26 },
  ]);

  const [pageData, setPageData] = useState([]); // ページごとに表示するデータ
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const itemsPerPage = 3; // 1ページあたりに表示するデータの数

  // 表示するデータが変更された場合に呼ばれる関数
  const handleDataChange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPageData(data.slice(startIndex, endIndex));
  };

  // ページ番号が変更された場合に呼ばれる関数
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 初回のページデータ生成
  React.useEffect(() => {
    handleDataChange();
  }, []);

  // ページ番号が変更された場合にページデータを更新
  React.useEffect(() => {
    handleDataChange();
  }, [currentPage]);

  return (
    <div>
      <ul>
        {pageData.map((item) => (
          <li key={item.id}>
            {item.name} ({item.age})
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}