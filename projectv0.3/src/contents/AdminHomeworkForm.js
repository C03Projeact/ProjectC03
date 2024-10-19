import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import apiURL from "../api/api"; 

const HomeworkForm = () => {
  const [homeworkData, setHomeworkData] = useState([]);

  useEffect(() => {
    const storedHomeworkData = localStorage.getItem('homeworkData');
    if (storedHomeworkData) {
      setHomeworkData(JSON.parse(storedHomeworkData));
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem('homeworkData', JSON.stringify(homeworkData));
  }, [homeworkData]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="Homework" style={{ width: '50px' }} />
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleEdit(row)}>Edit</button>
            <button onClick={() => handleDelete(row)}>Delete</button>
          </div>
        )
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: homeworkData
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: URL.createObjectURL(imageFile)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHomework = { ...formData };
    setHomeworkData([...homeworkData, newHomework]);
    setFormData({
      title: '',
      description: '',
      image: null
    });
  };

  const handleEdit = (row) => {
    // ใส่โค้ดสำหรับการแก้ไขข้อมูลในแถวนี้
    console.log('Editing row:', row);
  };

  const handleDelete = (row) => {
    // ใส่โค้ดสำหรับการลบข้อมูลในแถวนี้
    const updatedHomeworkData = homeworkData.filter(item => item !== row.original);
    setHomeworkData(updatedHomeworkData);
    console.log('Deleting row:', row);
  };

  return (
    <div>
      <h2>Add Homework</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add Homework</button>
      </form>

      <h2>Homework List</h2>
      <table {...getTableProps()} style={{ border: 'solid 1px blue', width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomeworkForm;
