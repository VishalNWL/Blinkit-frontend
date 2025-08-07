
import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import UploadImage from '../Utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../Utils/AxiosToastError';
import successAlert from '../Utils/SuccessAlert';

function EditProductAdmin({close,data:propsData,fetchProductData}) {
    const [data, setData] = useState({
        _id:propsData._id,
        name:propsData.name,
        image: propsData.image,
        category: propsData.category,
        subCategory:propsData.subCategory,
        unit: propsData.unit,
        stock: propsData.stock,
        price: propsData.price,
        discount: propsData.discount,
        description: propsData.description,
        more_details: propsData.more_details||{},
        publish: true
    })

    const [imgloading, setimgloading] = useState(false);
    const [ViewImageURL, setViewImageURL] = useState("")
    const allCategory = useSelector(state => state.product.allCategory)
    const allSubCategory = useSelector(state => state.product.allSubCategory)
    const [selectCategory, setSelectCategory] = useState("")
    const [selectSubCategory, setSelectSubCategory] = useState("")
    const [openAddField, setOpenAddField] = useState(false)
    const [fieldName, setFieldName] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }
        setimgloading(true)
        const response = await UploadImage(file)

        const { data: ImageResponse } = response

        setData((prev) => {
            return {
                ...prev,
                image: [...prev.image, ImageResponse.data]
            }
        })

        setimgloading(false)

    }

    const handleDeleteImage = async (index) => {
        data.image.splice(index, 1);
        setData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleRemoveCategory = async (idx) => {
        data.category.splice(idx, 1);
        setData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleRemoveSubCategory = async (idx) => {
        data.subCategory.splice(idx, 1);
        setData((prev) => {
            return {
                ...prev
            }
        })

    }

    const handleAddField = () => {

        setData((prev) => {
            return {
                ...prev,
                more_details: {
                    ...prev.more_details,
                    [fieldName]: ""
                }
            }
        })

        setFieldName("")
        setOpenAddField(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await Axios({
                ...SummaryAPi.updateProductDetails,
                data: data
            })

            const { data: responseData } = response
            if (responseData.success) {
                successAlert(responseData.message)
                setData({
                    name: "",
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: "",
                    stock: "",
                    price: "",
                    discount: "",
                    description: "",
                    more_details: {},
                    publish: true
                })

                if(close){
                    close()
                }
                fetchProductData()

            }
        } catch (error) {
            AxiosToastError(error)
        }

    }

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4'>
            <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>

                <section className=''>
                    <div className='p-2 bg-white shadow-md flex items-center justify-between '>
                        <h2 className=' font-semibold'>Update Product</h2>
                        <button onClick={close}><IoClose size={20}/></button>
                    </div>
                    <div className='grid p-3'>
                        <form className='grid gap-4' onSubmit={handleSubmit}>
                            <div className='grid gap-1'>
                                <label htmlFor='name' className='font-medium '>Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    placeholder='Enter product name'
                                    value={data.name}
                                    onChange={handleChange}
                                    name='name'
                                    required
                                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                                />
                            </div>
                            <div className='grid gap-1'>
                                <label htmlFor='description' className='font-medium '>Description</label>
                                <textarea
                                    type='text'
                                    id='description'
                                    placeholder='Enter product description'
                                    value={data.description}
                                    onChange={handleChange}
                                    name='description'
                                    required
                                    rows={3}
                                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                                />
                            </div>

                            <div>
                                <p>Image</p>
                                <div>
                                    <label htmlFor='productimage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                                        <div className='text-center flex justify-center items-center flex-col'>
                                            {
                                                imgloading ? <Loading /> : (
                                                    <>
                                                        <FaCloudUploadAlt size={35} />
                                                        <p>Upload Image</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <input
                                            id='productimage'
                                            type='file'
                                            className='hidden'
                                            onChange={handleUploadImage}
                                            accept='image/*'
                                        />
                                    </label>
                                    <div className='flex flex-wrap gap-4'>
                                        {/*Display Uploaded image */}
                                        {
                                            data.image?.map((img, idx) => {
                                                return (
                                                    <div key={img + idx} className='h-20 w-20 mt-2 min-w-20 bg-blue-50 border relative group'>
                                                        <img
                                                            src={img}
                                                            alt={img}
                                                            className='w-full h-full object-scale-down cursor-pointer mt-2'
                                                            onClick={() => setViewImageURL(img)}
                                                        />

                                                        <div onClick={() => { handleDeleteImage(idx) }} className='absolute bottom-0  right-0 p-1 bg-red-600 hover:bg-red-700 cursor-pointer rounded text-white hidden group-hover:block'>
                                                            <MdDelete />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='grid gap-1'>
                                <label className='font-medium '>Category</label>
                                <div>
                                    <select
                                        value={selectCategory}
                                        onChange={(e) => {
                                            const value = e.target.value

                                            if (data.category.find(cat => cat._id === value)) return;

                                            const category = allCategory.find(el => el._id === value)

                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    category: [...prev.category, category]
                                                }
                                            })
                                            setSelectCategory("");
                                        }}

                                        className='bg-blue-50 border w-full p-2 rounded'>
                                        <option value={""} disabled >Select Category</option>
                                        {
                                            allCategory.map((c, idx) => {
                                                return (
                                                    <option key={c._id + "CategoryDIsplay"} value={c?._id}>{c.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className='flex flex-wrap gap-3'>
                                        {
                                            data.category?.map((c, idx) => {
                                                return (<div key={c._id + idx + "productCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                                                    <p>{c.name}</p>
                                                    <div className='hover:text-red-500 cursor-pointer ' onClick={() => handleRemoveCategory(idx)} >
                                                        <IoClose size={20} />
                                                    </div>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='grid gap-1'>
                                <label className='font-medium '>Sub Category</label>
                                <div>
                                    <select
                                        value={selectSubCategory}
                                        onChange={(e) => {
                                            const value = e.target.value

                                            if (data.subCategory.find(el => el._id === value)) {
                                                return;
                                            }
                                            const subCategory = allSubCategory.find(el => el._id === value)

                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    subCategory: [...prev.subCategory, subCategory]
                                                }
                                            })
                                            setSelectSubCategory("");
                                        }}

                                        className='bg-blue-50 border w-full p-2 rounded'>
                                        <option value={""} disabled selected>Select SubCategory</option>
                                        {
                                            allSubCategory.map((c, idx) => {
                                                return (
                                                    <option value={c?._id} key={c?._id + idx + "SubCategoryAdded"}>{c.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className='flex flex-wrap gap-3'>
                                        {
                                            data.subCategory?.map((c, idx) => {
                                                return (<div key={c._id + idx + "productSubCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                                                    <p>{c.name}</p>
                                                    <div className='hover:text-red-500 cursor-pointer ' onClick={() => handleRemoveSubCategory(idx)} >
                                                        <IoClose size={20} />
                                                    </div>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='grid gap-1'>
                                <label htmlFor='unit' className='font-medium '>Unit</label>
                                <input
                                    type='text'
                                    id='unit'
                                    placeholder='Enter product unit'
                                    value={data.unit}
                                    onChange={handleChange}
                                    name='unit'
                                    required
                                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                                />
                            </div>

                            <div className='grid gap-1'>
                                <label htmlFor='stock' className='font-medium '>Stock Available.</label>
                                <input
                                    type='number'
                                    id='stock'
                                    placeholder='Enter product stock'
                                    value={data.stock}
                                    onChange={handleChange}
                                    name='stock'
                                    required
                                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                                />
                            </div>

                            <div className='grid gap-1'>
                                <label className='font-medium ' htmlFor='price'>Price</label>
                                <input
                                    type='number'
                                    id='price'
                                    placeholder='Enter product Price'
                                    value={data.price}
                                    onChange={handleChange}
                                    name='price'
                                    required
                                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                                />
                            </div>
                            <div className='grid gap-1'>
                                <label className='font-medium ' htmlFor='discount'>Discount</label>
                                <input
                                    type='number'
                                    id='discount'
                                    placeholder='Enter product discount'
                                    value={data.discount}
                                    onChange={handleChange}
                                    name='discount'
                                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                                />
                            </div>

                            {/*Add more field */}

                            {
                                Object?.keys(data?.more_details)?.map((k, index) => {
                                    return (
                                        <div className='grid gap-1'>
                                            <label className='font-medium ' htmlFor={k}>{k}</label>
                                            <input
                                                type='text'
                                                id={k}
                                                placeholder={k}
                                                value={data?.more_details[k]}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            more_details: {
                                                                ...prev.more_details,
                                                                [k]: value
                                                            }
                                                        }
                                                    })
                                                }}
                                                name={k}
                                                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                                            />
                                        </div>
                                    )
                                })
                            }

                            <div onClick={() => setOpenAddField(true)} className='inline-block hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 rounded cursor-pointer'>
                                Add Field
                            </div>

                            <button className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold '>
                                Update Product
                            </button>

                        </form>
                    </div>

                    {
                        ViewImageURL && (
                            <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
                        )
                    }
                    {
                        openAddField && (
                            <AddFieldComponent
                                close={() => setOpenAddField(false)}
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                                submit={handleAddField}
                            />
                        )
                    }
                </section>
            </div>
        </section>
    )
}

export default EditProductAdmin