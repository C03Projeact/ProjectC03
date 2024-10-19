import React from 'react';
import { useLocation } from 'react-router-dom';

const Page2 = () => {
  const location = useLocation();
  const { data } = location.state || {}; // ดึงข้อมูลจาก state ที่ส่งมาจาก Page1

  return (
    <div>
      <h1>Page 2</h1>
      <p>Data from Page 1: {data}</p>
    </div>
  );
};

export default Page2;
