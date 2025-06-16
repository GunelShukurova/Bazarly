
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../services/users/requests';


const AdminUser = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);

  console.log(users)


  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'fullname',
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
      title: 'Join ID',
      dataIndex: 'joinId',
      width: '12%',
    },
      { title: 'Balance', dataIndex: 'balance', width: '15%', render: (balance) => `$${balance}` },
      {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];



    const handleDelete = (id) => {


         dispatch(deleteUser({ id }));
  };
 

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