
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../services/users/requests';
import { useEffect, useState } from 'react';
import { updateUsers } from '../../redux/features/usersManagementSlice';
import { Button } from 'antd';

const AdminUser = () => {

  const dispatch = useDispatch();
 const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((resp) => {
      if (resp.data) {
             dispatch(updateUsers(resp.data)); 
      }
    });
  }, [dispatch]);

  const users = useSelector(state => state.usersManagement.users);



  const handleDelete = async (id) => {
    try {
 await deleteUser(id)

        const resp = await getAllUsers();
      if (resp.data) {
         dispatch(updateUsers(resp.data));
      }
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      width: '12%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '12%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '12%',
    },
    {
      title: "Joined at",
      dataIndex: "registeredAt",
         width: '12%',
      sorter: (a, b) => new Date(a.registeredAt) - new Date(b.registeredAt),
      render: (value) => {
        return <span>{new Date(value).toDateString()}</span>;
      },
    },
      { title: 'Balance', dataIndex: 'balance', width: '7%', render: (balance) => `$${balance}` },
      {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record) => (
        <Button
          type="primary" color="red" variant="outlined"
      onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];


  const tableStyle = {
    width: '90%',
    backgroundColor: '#f3ead375',
    borderRadius: '8px',
    marginLeft: "260px",
    position: "fixed",
    color: "#352411b5"

  };

  return (
    <>
    <h1 className='text-2xl font-semibold  text-[#352411b5] text-center mb-5 mt-2'>Users Management</h1>
    <Table
      columns={columns}
    dataSource={users}
          rowKey="id"
    
      style={tableStyle}
    />
    </>
  )
};


export default AdminUser;