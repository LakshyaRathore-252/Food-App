import React, { useState } from 'react';
import { assets } from '../../assets/admin_assets/assets';
import './Add.css';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [img, setImg] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = ({ target: { name, value } }) => {
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {

        e.preventDefault();
        if (!img) {
            toast.error("Please Upload Image");
            return;
        }
        console.log(img)

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", img);

        // Call API with formData
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            console.log(response);

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImg(false);
                console.log("Success message:", response.data.message);
                toast.success(response.data.message || "Successfully added!");
            } else {
                console.log("Error occurred in the response");
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log("Error during API call:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={img ? URL.createObjectURL(img) : assets.upload_area} alt="upload-area" />
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImg(e.target.files[0])}
                        required
                        hidden
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        type="text"
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        required
                        placeholder='Type Here'
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        name="description"
                        rows={6}
                        onChange={onChangeHandler}
                        value={data.description}
                        required
                        placeholder='Write content here'
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            name="category"
                            onChange={onChangeHandler}
                            value={data.category}
                            required
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure-Veg">Pure-Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            type="number"
                            name="price"
                            onChange={onChangeHandler}
                            value={data.price}
                            required
                            placeholder='e.g., 20$'
                        />
                    </div>
                </div>
                <button type='submit' className='add-button'>Add</button>
            </form>
        </div>
    );
};

export default Add;
