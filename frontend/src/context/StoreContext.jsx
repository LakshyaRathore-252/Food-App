import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);
import { toast } from 'react-toastify';

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const  url = import.meta.env.VITE_API_URL;
    
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        // Create a new entryy for foodItem.
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {

            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.get(url + '/api/cart/get', { headers: { token } });
        console.log(response)
        if(response.data.success){
            setCartItem(response.data.cartData);
            toast.success(response.data.message);

        }else{
            toast.error(response.data.message || "Something went wrong")
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            // console.log(item)
            // console.log(cartItem)
            if (cartItem[item] > 0) {

                let itemInfo = food_list.find((product) => product._id === item)
                // console.log(itemInfo)
                totalAmount += itemInfo.price * cartItem[item];
            }

        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)


    }
    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }



    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;