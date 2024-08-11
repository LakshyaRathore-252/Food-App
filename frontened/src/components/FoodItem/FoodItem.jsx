import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({ id, name, price, description, image }) => {

    const   { cartItem, setCartItem , addToCart , removeFromCart}= useContext(StoreContext);

    return (


        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-img' src={image} alt="images" />
                {  
                    !cartItem[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_green} alt='add-icon' /> :
                        <div className="food-item-counter">
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='remove-icon' />
                            <p>{cartItem[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='add-icon' />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="rating" />
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className="food-item-price">
                    $ {price}
                </p>
            </div>
        </div>
    )
}

export default FoodItem