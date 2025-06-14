import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getAllProducts } from '../../services/products/requests';



const Basket = () => {

    const [products, setProducts] = useState([])


    useEffect(() => {
        getAllProducts().then((resp) => {
            if (resp && Array.isArray(resp)) {
                const withQuantity = resp.map(item => ({
                    ...item,
                    quantity: 1,
                }));
                setProducts(withQuantity);
            }

            else if (resp && Array.isArray(resp.data)) {
                const withQuantity = resp.data.map(item => ({
                    ...item,
                    quantity: 1,
                }));
                setProducts(withQuantity);
            }
        });
    }, []);
    const handleRemove = (id) => {
        const updated = products.filter(product => product.id !== id);
        setProducts(updated);
    };

    const handleIncrement = (id) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        }));
    };

    const handleDecrement = (id) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                return { ...product, quantity: Math.max(product.quantity - 1, 1) };
            }
            return product;
        }));
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
    const columns = [
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
            render: (price) => `$${price}`,
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
            render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (_, record) => (
                <Button type="text" danger onClick={() => handleRemove(record.id)}></Button>
            ),
        },
    ];
    return <>

        <div className="bg-[#FDFBF7] mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10 mx-30">
            <div className="w-[200%] py-4">
                <div className="mx-10">
                    <h3 className="text-3xl font-bold mb-6">Shopping Basket</h3>
                    <p className="text-xl mb-10">Review your items before checkout</p>

                    <div
                        className="flex justify-between items-center px-4 py-3 w-[60%] bg-[#eadfd2]"

                    >
                        <span className="text-2xl font-semibold">
                            Basket Items <span>({products.length})</span>
                        </span>
                        <Button danger onClick={() => setProducts([])}>
                            Clear All
                        </Button>
                    </div>


                    <Table className='w-[60%] ' columns={columns} dataSource={products} rowKey="id"
                    />
                </div>

            </div>

            <div className="bg-[#f5ebdf] shadow-md p-6 text-center space-y-4 ml-50 rounded-lg w-105 h-100 mt-35">
              
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                   
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium text-lg">Subtotal:</span>
                    <span className='text-lg font-semibold  text-gray-700'>$7.78</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium text-lg">Shipping:</span>
                    <span className="text-gray-700 font-semibold text-lg">Free</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium text-lg">Tax:</span>
                    <span className="text-gray-700 font-semibold text-lg">$0.62</span>
                </div>
                <hr className='border-gray-600'/>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-bold text-xl text-gray-800 ">Total:</span>
                    <span className="text-gray-700 font-semibold text-lg">$8.40</span>
                </div>
                  <div className="flex justify-between text-sm text-gray-600">
               <span className="font-bold text-xl text-gray-800 ">Your Balance:</span>
                    <span className="text-gray-700 font-semibold text-lg">$150.00</span>
              
                </div>
                <button className='bg-[#ccbe94]  border border-black  text-lg px-6 py-2 cursor-pointer w-40 mt-5 hover:bg-[#d2c7a3]'>Place Order</button>
            </div>
        </div>

    </>
}
export default Basket;
