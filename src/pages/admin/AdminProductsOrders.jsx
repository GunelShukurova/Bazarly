import { Table, Button, Select, Popconfirm } from 'antd';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { getAllOrders, getAllProducts, updateOrderStatus, deleteOrder } from '../../services/products/requests';
import { getAllUsers } from '../../services/users/requests';

const AdminProductsOrders = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const loadData = async () => {
    try {
      const productsResponse = await getAllProducts();
      if (productsResponse.data) setProducts(productsResponse.data);

      const usersResponse = await getAllUsers();
      if (usersResponse.data) setUsers(usersResponse.data);

      const ordersResponse = await getAllOrders();
      if (ordersResponse.data) setOrders(ordersResponse.data);
    } catch {
      enqueueSnackbar("Failed to load data", { variant: "error" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(prev => prev.filter(order => order.id !== id));
      enqueueSnackbar("Order deleted successfully!", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to delete order.", { variant: "error" });
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, { status });
      enqueueSnackbar("Order status updated!", { variant: "success" });
      loadData();
    } catch {
      enqueueSnackbar("Failed to update order status", { variant: "error" });
    }
  };

  const columns = [
    {
      title: 'Ordered By',
      dataIndex: 'userId',
      width: '6%',
      render: (userId, record) => {
        if (record?.fullName) return record.fullName;
        const user = users.find(u => String(u.id) === String(userId));
        return user?.fullName || 'Unknown User';
      },
    },
    {
      title: 'Products',
      dataIndex: 'items',
      width: '6%',
      render: (items, record) => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Array.isArray(items || record?.basketItems) &&
            (items || record?.basketItems).map(item => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;
              return (
                <img
                  key={item.productId}
                  src={product.image}
                  alt={product.title}
                  style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 6 }}
                />
              );
            })}
        </div>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      width: '5%',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      width: '7%',
      render: (_, record) => {
        if (record?.totalPrice != null) {
          return `$${Number(record.totalPrice).toFixed(2)}`;
        }
        const items = record?.items || record?.basketItems || [];
        const total = Array.isArray(items)
          ? items.reduce((sum, item) => {
              const product = products.find(p => p.id === item.productId);
              return sum + (product?.price ?? 0) * (item.quantity ?? 1);
            }, 0)
          : 0;
        return `$${total.toFixed(2)}`;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '6%',
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 130 }}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      ),
    },
    {
      title: 'Delete Order',
      dataIndex: 'id',
      width: '5%',
      render: (id) => (
        <Popconfirm
          title="Are you sure you want to delete this order?"
          onConfirm={() => handleDeleteOrder(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className='ml-65'>
      <h1 className="text-2xl font-bold text-center mb-6">Products in Orders</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
};

export default AdminProductsOrders;
