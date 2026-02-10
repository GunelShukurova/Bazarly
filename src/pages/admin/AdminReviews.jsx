import { Table, Button, Select, Tag, Modal, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getAllReviews, deleteReview, updateReview } from '../../services/reviews/requests';
import { getAllUsers } from '../../services/users/requests';
import { useSnackbar } from 'notistack';
import { updateReviewStatus } from '../../services/reviews/requests';

const AdminReviews = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [activeReview, setActiveReview] = useState(null);

  const loadData = async () => {
    try {
      const reviewsResp = await getAllReviews();
      if (reviewsResp?.data) setReviews(reviewsResp.data);

      const usersResp = await getAllUsers();
      if (usersResp?.data) setUsers(usersResp.data);
    } catch (err) {
      enqueueSnackbar("Failed to load data", { variant: "error" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteReview(id);
      if (res?.success) {
        setReviews(prev => prev.filter(r => r.id !== id));
        enqueueSnackbar("Review deleted successfully!", { variant: "success" });
      }
    } catch {
      enqueueSnackbar("Failed to delete review.", { variant: "error" });
    }
  };

  const handleStatusChange = async (reviewId, status) => {
    try {
      await updateReviewStatus(reviewId, { status });
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status } : r));
      enqueueSnackbar("Status updated successfully!", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to update status.", { variant: "error" });
    }
  };

  const openReplyModal = (review) => {
    setActiveReview(review);
    setReplyText(review.adminReply || '');
    setIsReplyModalOpen(true);
  };

  const handleReplySave = async () => {
    if (!activeReview) return;
    try {
      const res = await updateReview(activeReview.id, { adminReply: replyText });
      if (res?.success) {
        setReviews(prev => prev.map(r => r.id === activeReview.id ? { ...r, adminReply: replyText } : r));
        enqueueSnackbar("Reply saved successfully!", { variant: "success" });
        setIsReplyModalOpen(false);
        setActiveReview(null);
        setReplyText('');
      }
    } catch {
      enqueueSnackbar("Failed to save reply.", { variant: "error" });
    }
  };

  const statusColors = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red'
  };

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profileImage',
      width: '5%',
      render: img => <img src={img} alt="profile" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      width: '5%',
    },
    {
      title: 'Email',
      dataIndex: 'userId',
      width: '10%',
      render: userId => {
        const user = users.find(u => u.id === userId);
        return user ? user.email : 'Unknown';
      }
    },
    {
      title: 'Review',
      dataIndex: 'comment',
      width: '5%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '2%',
      render: (status, record) => (
        <Select
          value={status || 'pending'}
          style={{ width: 120 }}
          onChange={value => handleStatusChange(record.id, value)}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ]}
        >
          <Tag color={statusColors[status]}>{status}</Tag>
        </Select>
      ),
    },
    {
      title: 'Submitted At',
      dataIndex: 'createdAt',
      width: '4%',
      render: value => new Date(value).toLocaleDateString()
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '4%',
      render: (_, record) => (
        <Space>
          <Button type="default" onClick={() => openReplyModal(record)}>
            {record.adminReply ? 'Edit Reply' : 'Reply'}
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='ml-65'>
      <h1 className='text-2xl font-semibold text-center p-5'>Reviews Management</h1>
      <Table columns={columns} dataSource={reviews} rowKey="id" pagination={{ pageSize: 8 }} />
      <Modal
        title="Reply to review"
        open={isReplyModalOpen}
        onOk={handleReplySave}
        onCancel={() => {
          setIsReplyModalOpen(false);
          setActiveReview(null);
          setReplyText('');
        }}
        okText="Save Reply"
      >
        <Input.TextArea
          rows={4}
          value={replyText}
          onChange={(event) => setReplyText(event.target.value)}
          placeholder="Write your reply..."
        />
      </Modal>
    </div>
  );
};

export default AdminReviews;
