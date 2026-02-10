import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useSnackbar } from 'notistack';
import { createOrder, fetchUserBasket, getUserById, updateUserBalance } from '../../services/users/requests';
import { clearUserCart, deleteCartItem, updateCartItem } from '../../services/basket/requests';
import { useCart } from '../../context/cartContext';

import { Modal, Form } from 'antd';



const Basket = () => {

    const [balance, setBalance] = useState(0);
    const { cartItems, setCartItems } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderForm] = Form.useForm();
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        orderForm.resetFields();
    };
    const handleOrderSubmit = async () => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        try {
            if (cartItems.length === 0) {
                enqueueSnackbar("Your basket is empty!", { variant: "warning" });
                return;
            }
            const values = await orderForm.validateFields();
            if (total > balance) {
                enqueueSnackbar("Insufficient balance!", { variant: "error" });
                return;
            }
            const order = {
                userId: JSON.parse(localStorage.getItem("userId")),
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: getDiscountedPrice(item),
                })),
                totalPrice: total,
                shippingAddress: values.address,
                fullName: values.fullName,
                phoneNumber: values.phone,
                createdAt: new Date().toISOString(),
                status: "pending"
            };

            const handleRemove = async (basketItemId) => {
                const userId = JSON.parse(localStorage.getItem("userId"));
                try {
                    await deleteCartItem(userId, basketItemId);
                    const newProducts = product.filter(item => item.id !== basketItemId);
                    updateBasket(newProducts);
                    setProducts(newProducts);
                    enqueueSnackbar("Product successfully removed from cart", { variant: "success" });
                } catch (error) {
                    enqueueSnackbar("Error removing product from cart", { variant: "error" });
                }
            }
            await createOrder(order);
            const newBalance = balance - total;
            const updateBalanceRes = await updateUserBalance(userId, newBalance);
            if (!updateBalanceRes.success) {
                enqueueSnackbar("Failed to update balance", { variant: "error" });
                return;
            }
            setBalance(newBalance);
            enqueueSnackbar("Order placed successfully!", { variant: "success" });
            handleCloseModal();
            await clearUserCart(order.userId);
            setCartItems([]);
        } catch (error) {
            console.error("Failed to submit order:", error);
            enqueueSnackbar("Please fill all fields correctly", { variant: "error" });
        }
    };

    const { enqueueSnackbar } = useSnackbar();
    const loadBasket = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userId"));
            if (!userId || userId === "null") {
                enqueueSnackbar("User not logged in!", { variant: "warning" });
                setCartItems([]);
                setBalance(0);
                return;
            }

            const basketRes = await fetchUserBasket(userId);
            if (basketRes.success) {
                setCartItems(basketRes.data || []);
                const userRes = await getUserById(userId);
                if (userRes.success && userRes.data) {
                    setBalance(userRes.data.balance || 0);
                } else {
                    setBalance(0);
                }
            } else {
                enqueueSnackbar(basketRes.message, { variant: "warning" });
                setCartItems([]);
                setBalance(0);
            }
        } catch (e) {
            enqueueSnackbar("Failed to load basket", { variant: "error" });
        }
    };

    useEffect(() => {
        loadBasket();
    }, []);

    const handleIncrement = async (productId) => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        try {
            const product = cartItems.find(item => item.id === productId);
            if (!product) return;
            const newQuantity = product.quantity + 1;
            await updateCartItem(userId, productId, newQuantity);
            setCartItems(prevProducts =>
                prevProducts.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
            enqueueSnackbar("Quantity updated", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Failed to update quantity", { variant: "error" });
        }
    };
    const handleDecrement = async (productId) => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        try {
            const product = cartItems.find(item => item.id === productId);
            if (!product || product.quantity <= 1) return;
            const newQuantity = product.quantity - 1;
            await updateCartItem(userId, productId, newQuantity);
            setCartItems(prevProducts =>
                prevProducts.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
            enqueueSnackbar("Quantity updated", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Failed to update quantity", { variant: "error" });
        }
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    const getDiscountedPrice = (item) => {
        if (item.isOnSale && item.salePercentage > 0) {
            return item.price * (1 - item.salePercentage / 100);
        }
        return item.price;
    };

    const handleRemove = async (basketItemId) => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        try {
            await deleteCartItem(userId, basketItemId);
            setCartItems(prev => prev.filter(item => item.id !== basketItemId));
            enqueueSnackbar("Product successfully removed from cart", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Error removing product from cart", { variant: "error" });
        }
    }

    const handleClearAll = async () => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        try {
            await clearUserCart(userId);
            setCartItems([]);
            enqueueSnackbar("Cart has been cleared", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Failed to clear the cart", { variant: "error" });
        }

    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => {
                        var _a;
                        return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
                    }, 100);
                }
            },
        },

    });
    const columns1 = [
        {
            title: 'Product',
            dataIndex: 'title',
            key: 'title',
            width: '35%',
            ...getColumnSearchProps('title'),
            render: (_, record) => (
                <div className="flex items-center gap-4">
                    <img
                        src={record.image}
                        alt={record.title}
                        className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                        <div className="font-medium">{record.title}</div>
                        <div className="text-sm text-gray-500">
                            {record.inStock > 0 ? `${record.inStock} in stock` : 'Out of stock'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
            render: (_, record) => {
                const discountedPrice = getDiscountedPrice(record);
                return record.isOnSale ? (
                    <div>
                        <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: 8 }}>
                            ${record.price.toFixed(2)}
                        </span>
                        <span>${discountedPrice.toFixed(2)}</span>
                    </div>
                ) : (
                    `$${record.price.toFixed(2)}`
                );
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Button size="small" onClick={() => handleDecrement(record.id)}>-</Button>
                    <span>{record.quantity}</span>
                    <Button size="small" onClick={() => handleIncrement(record.id)}>+</Button>
                </div>
            ),
        },

        {
            title: 'Total',
            key: 'total',
            width: '15%',
            render: (_, record) => {
                const discountedPrice = getDiscountedPrice(record);
                return `$${(discountedPrice * record.quantity).toFixed(2)}`;
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (_, record) => (

                <Button
                    type="default"
                    danger
                    onClick={() => handleRemove(record.id)}
                    style={{ border: '1px solid red', color: 'red' }}
                >
                    Delete
                </Button>

            ),
        }
    ];
    const subtotal = cartItems.reduce((acc, item) => acc + getDiscountedPrice(item) * item.quantity, 0);
    const fixedTax = subtotal > 0 ? 0.62 : 0;
    const total = subtotal + fixedTax;

    return (
        <>
            <Modal
                title="Enter Delivery Details"
                open={isModalOpen}
                onOk={handleOrderSubmit}
                onCancel={handleCloseModal}
                okText="Confirm Order"
                cancelText="Cancel"

            >
                <Form layout="vertical" form={orderForm}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: "Please enter your name" }]}

                    >
                        <Input placeholder="John Doe" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            { required: true, message: "Please enter your phone number" },
                            { message: "Invalid phone number" }
                        ]}
                    >
                        <Input placeholder="+1234567890" />
                    </Form.Item>

                    <Form.Item
                        label="Shipping Address"
                        name="address"
                        rules={[{ required: true, message: "Please enter your address" }]}
                    >
                        <Input.TextArea rows={3} placeholder="123 Main St, City, Country" />
                    </Form.Item>
                </Form>
            </Modal>

            <div className="bg-[#FDFBF7]  pt-15 grid grid-cols-1 xl:grid-cols-2 gap-10 px-4 sm:px-6 md:px-10 lg:px-20">
                <div className="w-full xl:w-full  py-4">
                    <div className="mx-0 sm:mx-4 md:mx-8">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-6">Shopping Basket</h3>
                        <p className="text-lg sm:text-xl mb-8">Review your items before checkout</p>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 w-full bg-[#eadfd2] rounded-md">
                            <span className="text-xl font-semibold mb-2 sm:mb-0">
                                Basket Items <span>({cartItems.length})</span>
                            </span>
                            <Button danger onClick={handleClearAll}>Clear All</Button>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <Table
                                className="min-w-[600px] md:min-w-full"
                                columns={columns1}
                                dataSource={cartItems}
                                rowKey="id"
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-[#f5ebdf] shadow-md p-6 text-center space-y-4  sm:w-100 md:w-100  lg:w-110  rounded-lg w-full h-fit mt-10 xl:mt-35">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-medium text-lg">Subtotal:</span>
                        <span className="text-lg font-semibold text-gray-700">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-medium text-lg">Shipping:</span>
                        <span className="text-gray-700 font-semibold text-lg">Free</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-medium text-lg">Tax:</span>
                        <span className="text-gray-700 font-semibold text-lg">${fixedTax.toFixed(2)}</span>
                    </div>
                    <hr className="border-gray-400" />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-bold text-xl text-gray-800">Total:</span>
                        <span className="text-gray-700 font-semibold text-lg">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-bold text-xl text-gray-800">Your Balance:</span>
                        <span className="text-gray-700 font-semibold text-lg">${balance}</span>
                    </div>
                    <button onClick={handleOpenModal}
                        disabled={cartItems.length === 0} className="bg-[#ccbe94] border border-black text-lg px-6 py-2 cursor-pointer w-full sm:w-40 mt-5 hover:bg-[#d2c7a3]">
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );

}
export default Basket;
