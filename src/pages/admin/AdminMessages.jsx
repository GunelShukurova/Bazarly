import { Select, Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { deleteMessage, getAllMessages, updateContactIsRead } from '../../services/messages/requests';

const AdminMessages = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [messages, setMessages] = useState([]);

  // Загрузка всех сообщений
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const resp = await getAllMessages();
        if (resp?.data) setMessages(resp.data);
      } catch (err) {
        enqueueSnackbar("Failed to load messages", { variant: "error" });
      }
    };
    fetchMessages();
  }, []);

  // Изменение статуса сообщения
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

  // Удаление сообщения
  const handleDelete = async (id) => {
    try {
      const res = await deleteMessage(id);
      if (res?.success || res?.data) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
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
    { title: 'Message', dataIndex: 'messages', width: '25%' }, // исправлено с messages
    {
      title: "Status",
      dataIndex: "id",
      width: '10%',
      render: (_, record) => (
        <Select
          defaultValue={record.status || "pending"}
          style={{ width: 130 }}
          onChange={(val) => handleStatusChange(record.id, val)}
          options={[
            { value: "pending", label: "Pending" },
            { value: "responded", label: "Responded" },
            { value: "spam", label: "Spam" },
          ]}
        />
      ),
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      width: '10%',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '8%',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="px-6 pt-6 w-[89%] min-h-screen bg-gray-50 ml-[234px]">
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Messages Management</h1>
      <Table
        columns={columns}
        dataSource={messages}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
};

export default AdminMessages;
