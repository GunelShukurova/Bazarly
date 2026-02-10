import { Table, Button, Tag, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { banUser, deleteUser, getAllUsers, unBanUser } from '../../services/users/requests';
import { useEffect } from 'react';
import { updateUsers } from '../../redux/features/usersManagementSlice';
import { enqueueSnackbar } from "notistack";
import moment from 'moment';

const AdminUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const resp = await getAllUsers();
      if (resp.data) dispatch(updateUsers(resp.data));
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const users = useSelector(state => state.usersManagement.users);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      enqueueSnackbar("User deleted successfully", { variant: "success" });
      fetchUsers();
    } catch (err) {
      enqueueSnackbar("Failed to delete user", { variant: "error" });
    }
  };


  const handleBanToggle = async (user) => {
    try {
      if (user.isBanned) {
        await unBanUser(user.id);
        enqueueSnackbar(`User ${user.fullName} unbanned`, { variant: 'success' });
      } else {
        await banUser(user.id, 60); // бан на 60 минут
        enqueueSnackbar(`User ${user.fullName} banned for 1 hour`, { variant: 'success' });
      }
      fetchUsers();
    } catch (err) {
      enqueueSnackbar('Failed to update ban status', { variant: 'error' });
    }
  };


  const columns = [
    { 
      title: 'Profile', 
      dataIndex: 'profileImage', 
      width: '2%',
      render: (img) => (
        <img 
          src={img} 
          alt="profile" 
          style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} 
        />
      )
    },
    { title: 'Fullname', dataIndex: 'fullName', width: '15%' },
    { title: 'Email', dataIndex: 'email', width: '20%' },
    { title: 'Phone', dataIndex: 'phone', width: '12%' },
    { 
      title: "Joined at", 
      dataIndex: "registeredAt", 
      width: '12%',
      sorter: (a, b) => new Date(a.registeredAt) - new Date(b.registeredAt),
      render: (value) => moment(value).format("MMM DD, YYYY"),
    },
    { 
      title: 'Balance', 
      dataIndex: 'balance', 
      width: '8%', 
      render: (balance) => <span>${balance}</span> 
    },
    {
      title: 'Status',
      dataIndex: 'isBanned',
      width: '5%',
      render: (isBanned, record) => (
        isBanned 
          ? <Tag color="red">Banned until {moment(record.banUntil).format("MMM DD")}</Tag> 
          : <Tag color="green">Active</Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      render: (_, record) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>Delete</Button>
          </Popconfirm>

          <Button 
            type={record.isBanned ? "default" : "primary"} 
            style={{ backgroundColor: record.isBanned ? "#10b981" : "#f87171", color: "white" }}
            onClick={() => handleBanToggle(record)}
          >
            {record.isBanned ? "Unban" : "Ban"}
          </Button>
        </div>
      ),
    }
  ];

  return (
    <div className="px-6 pt-6 w-[88%] min-h-screen bg-gray-50 ml-[239px]">
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Users Management</h1>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        rowClassName={(record) => record.isBanned ? 'bg-red-50' : ''}
        bordered
      />
    </div>
  );
};

export default AdminUser;
