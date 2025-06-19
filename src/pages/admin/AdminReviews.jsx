import { Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../services/users/requests';
import { useEffect, useState } from 'react';
import { updateUsers } from '../../redux/features/usersManagementSlice';
import { Button } from 'antd';
import { deleteMessage, getAllMessages, updateContactIsRead } from '../../services/messages/requests';
import { useSnackbar } from 'notistack';
import { deleteReview, getAllReviews } from '../../services/reviews/requests';



              
const AdminReviews = () => {
  
const { enqueueSnackbar } = useSnackbar();
const [reviews, setReviews] = useState([]);

useEffect(() => {
  getAllReviews().then((resp) => {
    if (resp?.data) {
      setReviews(resp.data);
    }
  });
}, []);


  

const handleDelete = async (id) => {
  try {
    const res = await deleteReview(id);
    if (res?.data) {
      setReviews((prev) => prev.filter((user) => user.id !== id));
      enqueueSnackbar("Review deleted successfully!", { variant: "success" });
    }
  } catch (err) {
    enqueueSnackbar("Failed to delete review.", { variant: "error" });
  }
};

  const columns = [
           { 
  title: 'Profile Image', 
  dataIndex: 'profileImage', 
  width: '5%',
  render: (img) => (
    <img 
      src={img} 
      alt="profile" 
      style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} 
    />
  )
},
    { title: 'Fullname', dataIndex: 'fullName', width: '12%' },
    { title: 'Email', dataIndex: 'email', width: '12%' },
    { title: 'Review', dataIndex: 'comment', width: '12%' },
 
    {
 title: "Submitted At",
      dataIndex: "createdAt",
      width: '8%',
        render: (value) => new Date(value).toLocaleDateString()
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}
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
      <h1 className='text-2xl font-semibold text-[#352411b5] text-center mb-5'>Reviews Management</h1>
      <Table columns={columns} dataSource={reviews} rowKey="id" style={tableStyle} />
    </>
  );
};



export default AdminReviews

