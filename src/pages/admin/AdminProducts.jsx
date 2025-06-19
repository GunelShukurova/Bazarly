
import { Input, Modal, Table } from 'antd';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { Button } from 'antd';
import { deleteProducts, getAllProducts, postProducts } from '../../services/products/requests';
import { useEffect, useState } from 'react';
import addProductvalidationSchema from '../../validations/addProductValidations';


const AdminProducts = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showAddModal = () => {
        setIsModalOpen(true);
        addFormik.resetForm();
    };
    const handleAddCancel = () => {
        setIsModalOpen(false);
    };

    const addFormik = useFormik({
        initialValues: {
            title: '',
            image: '',
            category: '',
            salePercentage: '',
            inStock: '',
            price: '',

        }, validationSchema: addProductvalidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const formattedValues = {
                ...values,

                price: Number(values.price),
                salePercentage: Number(values.salePercentage),
                inStock: Number(values.inStock),
            };
            try {
                const response = await postProducts(formattedValues);
                if (response?.data) {
                    setProducts(prev => [...prev, response.data]);
                    enqueueSnackbar("Product created successfully!", { variant: "success" });
                    setIsModalOpen(false);
                    resetForm();
                }
            } catch (error) {
                enqueueSnackbar("Failed to create product.", { variant: "error" });
            }
        }
    });


    const [products, setProducts] = useState([])
    useEffect(() => {

        getAllProducts().then((resp) => {
            if (resp.data) {
                setProducts(resp.data)
            }
        })
    }, [])


    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
            width: '3%',
        },
        {
            title: "Image",
            dataIndex: "image",
            width: '7%',
            render: (value) => (
                <img
                    src={value}
                    alt="Product"
                    style={{ width: '90px', height: '70px', objectFit: 'cover' }}
                />
            ),

        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '10%',
        },


        {
            title: "Category",
            dataIndex: "category",
            width: '6%',

        },
        {
            title: "Price",
            dataIndex: "price",
            width: '7%',
            render: (price) => `$${price.toFixed(2)}`
        },
        {
            title: "Sale Status",
            dataIndex: "salePercentage",
            width: '6%',
            render: (salePercentage) => (
                <span style={{ color: salePercentage > 0 ? 'green' : 'gray', fontWeight: 600 }}>
                    {salePercentage > 0 ? `On Sale (${salePercentage}%)` : "No"}
                </span>
            )
        }
        ,
        {
            title: "Total Price",
            dataIndex: "price",
            width: '3%',
            sorter: (a, b) => {
                const aPrice = a.price - (a.price * a.salePercentage / 100);
                const bPrice = b.price - (b.price * b.salePercentage / 100);
                return aPrice - bPrice;
            },
            render: (_, record) => {
                const { price, salePercentage } = record;
                const discounted = price - (price * salePercentage / 100);
                return (
                    <span style={{ color: salePercentage > 0 ? 'green' : 'black' }}>
                        ${discounted.toFixed(2)}
                    </span>
                );
            }
        }
        ,

        {
            title: 'Action',
            dataIndex: 'action',
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
            <h1 className='text-2xl font-semibold  text-[#352411b5] text-center mb-5 '>Products Management</h1>
            <Button
                type="primary"
                onClick={showAddModal}
                style={{ float: "right", marginRight: "3%", marginBottom: "10px" }}

            >
                Create
            </Button>
            <Table
                columns={columns}
                rowKey="id"
                dataSource={products}
                style={tableStyle}
            />
            <Modal
                title="Add New Product"
                closable
                open={isModalOpen}
                onCancel={handleAddCancel}
                onOk={addFormik.submitForm}
            >
                <form onSubmit={addFormik.handleSubmit}
                    className="flex flex-col gap-2 mt-3.5"
                >
                    <Input
                        value={addFormik.values.title}
                        status={
                            addFormik.errors.title && addFormik.touched.title ? "error" : ""
                        }
                        name="title"
                        onChange={addFormik.handleChange}
                        onBlur={addFormik.handleBlur}
                        type="text"
                        required
                        placeholder="Product title"
                    />
                    {addFormik.errors.title && addFormik.touched.title && (
                        <div className="text-red-500 text-xs">{addFormik.errors.title}</div>
                    )}

                    <Input
                        value={addFormik.values.category}
                        status={
                            addFormik.errors.category && addFormik.touched.category ? "error" : ""
                        }
                        name="category"
                        onChange={addFormik.handleChange}
                        onBlur={addFormik.handleBlur}
                        type="text"
                        required
                        placeholder="Product category"
                    />
                    {addFormik.errors.category && addFormik.touched.category && (
                        <div className="text-red-500 text-xs">{addFormik.errors.category}</div>
                    )}

                    <Input
                        value={addFormik.values.inStock}
                        status={
                            addFormik.errors.inStock && addFormik.touched.inStock ? "error" : ""
                        }
                        name="inStock"
                        onChange={addFormik.handleChange}
                        onBlur={addFormik.handleBlur}
                        type="number"

                        required
                        placeholder="Enter stock quantity"
                    />
                    {addFormik.errors.inStock && addFormik.touched.inStock && (
                        <div className="text-red-500 text-xs">{addFormik.errors.inStock}</div>
                    )}

                    <Input
                        type="number"
                        status={
                            addFormik.errors.salePercentage && addFormik.touched.salePercentage
                                ? "error"
                                : ""
                        }
                        value={addFormik.values.salePercentage}
                        name="salePercentage"
                        onChange={addFormik.handleChange}
                        onBlur={addFormik.handleBlur}
                        min={0}
                        max={100}
                        required
                        placeholder="Enter discount (%)"
                    />
                    {addFormik.errors.salePercentage && addFormik.touched.salePercentage && (
                        <div className="text-red-500 text-xs">
                            {addFormik.errors.salePercentage}
                        </div>
                    )}
                    <Input
                        type="number"
                        status={
                            addFormik.errors.price && addFormik.touched.price
                                ? "error"
                                : ""
                        }
                        value={addFormik.values.price}
                        name="price"
                        onChange={addFormik.handleChange}
                        onBlur={addFormik.handleBlur}
                        min={10}
                        required
                        placeholder="Product Price"
                    />
                    {addFormik.errors.price && addFormik.touched.price && (
                        <div className="text-red-500 text-xs">
                            {addFormik.errors.price}
                        </div>
                    )}
                    <Input
                        type="url"
                        status={
                            addFormik.errors.image && addFormik.touched.image
                                ? "error"
                                : ""
                        }
                        value={addFormik.values.image}
                        name="image"
                        onChange={addFormik.handleChange}
                        onBlur={addFormik.handleBlur}
                        addonBefore="https://"
                        required
                        placeholder="Product Image Url"
                    />
                    {addFormik.errors.image && addFormik.touched.image && (
                        <div className="text-red-500 text-xs">
                            {addFormik.errors.image}
                        </div>
                    )}
                </form>
            </Modal>

        </>
    )
};




export default AdminProducts
