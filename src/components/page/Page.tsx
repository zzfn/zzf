import React, { useEffect, useState } from 'react';

function Page({ onChange, total }) {
  const [totalPage, setTotalPage] = useState(Math.ceil(total / 10));
  const [pages, setPages] = useState([]);
  useEffect(() => {
    for (let i = 0; i < totalPage; i++) {
      setPages([...pages, i]);
    }
  }, [totalPage]);
  return (
    <div style={{ textAlign: 'center' }}>
      {Array.apply(null, { length: Math.ceil(total / 10) }).map((i, idx) => (
        <span
          style={{
            width: '10px',
            display: 'inline-block',
            padding: '10px',
            cursor: 'pointer',
            border: '1px solid #ccc',
          }}
          key={idx}
          onClick={() => onChange(idx + 1)}
        >
          {idx + 1}
        </span>
      ))}
    </div>
  );
}

export default Page;
