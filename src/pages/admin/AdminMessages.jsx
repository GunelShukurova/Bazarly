import { Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../services/users/requests';
import { useEffect, useState } from 'react';
import { updateUsers } from '../../redux/features/usersManagementSlice';
import { Button } from 'antd';
import { deleteMessage, getAllMessages, updateContactIsRead } from '../../services/messages/requests';
import { useSnackbar } from 'notistack';



const AdminMessages = () => {
  
const { enqueueSnackbar } = useSnackbar();
const [messages, setMessages] = useState([]);

useEffect(() => {
  getAllMessages().then((resp) => {
    if (resp?.data) {
      setMessages(resp.data);
    }
  });
}, []);


  const handleStatusChange = async (id, updatedStatus) => {
    try {
           await updateContactIsRead(id, updatedStatus);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: updatedStatus } : msg
        )
      );
      enqueueSnackbar("Message status updated successfully!", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to update status.", { variant: "error" });
    }
  };
  

const handleDelete = async (id) => {
  try {
    const res = await deleteMessage(id);
    if (res?.data) {
      setMessages((prev) => prev.filter((user) => user.id !== id));
      enqueueSnackbar("Message deleted successfully!", { variant: "success" });
    }
  } catch (err) {
    enqueueSnackbar("Failed to delete message.", { variant: "error" });
  }
};


  const columns = [
    { title: 'Fullname', dataIndex: 'fullName', width: '12%' },
    { title: 'Email', dataIndex: 'email', width: '12%' },
    { title: 'Subject', dataIndex: 'subject', width: '12%' },
    { title: 'Message', dataIndex: 'message', width: '12%' },
     {
      title: "Message Status",
      dataIndex: "id" ,
      width: '8%' ,

      render: (value, record) => {
        return (
         <Select
  defaultValue={record.status}
  style={{ width: 120 }}
  onChange={(val) => {
    handleStatusChange(record.id, val);
   
  }}
  options={[
    { value: "pending", label: "pending" },
    { value: "responded", label: "responded" },
    { value: "spam", label: "spam" },
  ]}
/>

        );
      },
    },
    {
 title: "Submitted At",
      dataIndex: "submittedAt",
      width: '8%',
        render: (value) => new Date(value).toLocaleDateString()
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
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
      <h1 className='text-2xl font-semibold text-[#352411b5] text-center mb-5'>Messages Management</h1>
      <Table columns={columns} dataSource={messages} rowKey="id" style={tableStyle} />
    </>
  );
};



export default AdminMessages
