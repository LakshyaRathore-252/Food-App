import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list, url } = useContext(StoreContext);
    console.log(food_list)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className='food-display-list'>
                {
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            console.log(category)
                            console.log(item.category)
                            return <FoodItem key={index} id={item._id} name={item.name} url={url} description={item.description} price={item.price} image={item.image} />
                        }
                    })
                }

            </div>
        </div>
    )
}

export default FoodDisplay