
import {Table } from 'antd';
import { useSnackbar } from 'notistack';
import { Button } from 'antd';
import { deleteProducts, getAllOrders, getAllProducts, updateOrderStatus } from '../../services/products/requests';
import { useEffect, useState } from 'react';
import { Select } from 'antd';



const AdminProductsOrders = () => {

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const loadData = async () => {

            const productsResponse = await getAllProducts();

        try {
        
            if (productsResponse.data) setProducts(productsResponse.data);

            const usersResponse = await getAllUsers();
            if (usersResponse.data) setUsers(usersResponse.data);


            const ordersResponse = await getAllOrders();
            if (ordersResponse.data) setOrders(ordersResponse.data);
        
        }
 catch (error) {
            enqueueSnackbar("Failed to load data", { variant: "error" });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const columns = [
        {
            title: 'Ordered By',
            dataIndex: 'userId',
            width: '12%',
            key: 'user',
            render: (userId) => {
                const user = users.find(u => u.id === userId);
                return user ? user.fullName : 'Unknown User';
            }
        },
        {
            title: 'Ordered Products',
            dataIndex: 'basketItems',
            render: (basketItems) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    {basketItems.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        if (!product) return null;
                        return (
                            <img
                                key={item.id}
                                src={product.image}
                                alt={product.title}
                                style={{ width: '90px', height: '70px', objectFit: 'cover' }}
                            />
                        );
                    })}
                </div>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '10%',
        },

        {
            title: 'Order Date',
            dataIndex: 'createdAt',
            key: 'createdAt',

            width: '3%',
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            title: "Total Price",
            dataIndex: "price",
            width: '3%',
            key: 'price',
            render: (price) => `$${price.toFixed(2)}`
        },
        ,
        {
            title: "Order Status",
            dataIndex: "id",
            render: (value, record) => {
                return (
                    <Select
                        onChange={async (updatedStatus) => {
                         await updateOrderStatus(record.id, { status: updatedStatus });
                            enqueueSnackbar("Order status updated successfully!", {
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "right",
                                },
                                autoHideDuration: 2000,
                                variant: "success",
                            });
                        }}
                        defaultValue={record.status}
                        style={{ width: 120 }}
                        options={[
                            { value: "pending", label: "pending" },
                            { value: "shipped", label: "shipped" },
                            { value: "delivered", label: "delivered" },
                            { value: "cancelled", label: "cancelled" }

                        ]}
                    />
                );
            },
        }, {
            title: 'Ordered Products',
            dataIndex: 'basketItems',
            width: '20%',
            render: (basketItems) => {
                if (!Array.isArray(basketItems)) return null;

                return (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {basketItems.map(item => {
                            const product = products.find(p => p.id === item.productId);
                            if (!product) return null;

                            return (
                                <img
                                    key={item.id}
                                    src={product.image}
                                    alt={product.title}
                                    style={{ width: '90px', height: '70px', objectFit: 'cover' }}
                                />
                            );
                        })}
                    </div>
                );
            }
        }
        ,
        {
            title: "Delete",
            dataIndex: "id",
            width: '3%',
            render: (_, record) => (

                <Button
                    type="primary" color="red" variant="outlined"
                    danger
                    onClick={async () => {
                        try {
                            const res = await deleteProducts(record.id);

                            if (res.data) {
                                setProducts(prev => prev.filter(p => p.id !== record.id));
                                enqueueSnackbar("Product deleted successfully!", {
                                    autoHideDuration: 2000,
                                    variant: "success",
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                    },
                                });
                            } else {
                                enqueueSnackbar("Failed to delete product.", {
                                    variant: "error",
                                    autoHideDuration: 2000,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                    },
                                });
                            }
                        } catch (error) {
                            enqueueSnackbar("Server error. Try again later.", {
                                variant: "error",
                                autoHideDuration: 2000,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "right",
                                },
                            });
                        }
                    }}
                >
                    Delete
                </Button>
            )
        }

    ];

    const tableStyle = {
        width: '90%',
        backgroundColor: '#f3ead375',
        borderRadius: '8px',
        marginLeft: "260px",

        color: "#352411b5"

    };

    return (
        <>
            <h1 className='text-2xl font-semibold  text-[#352411b5] text-center mb-5 '>Products in Orders</h1>
            <Table
                columns={columns}
                rowKey="id"
                dataSource={orders}
                style={tableStyle}
            />
        </>
    )
};


export default AdminProductsOrders




