import React, { useEffect, useState } from 'react'
import './List.css'
import './spinner.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      console.log(response.data.message);
      await fetchList();
      toast.success(response.data.message || "Error while removing")
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message || "Error while removing");

    }
  }

  return (
    <>
      {
        loading ? (<div className='loader-center'><span className="loader"></span></div>) : (
          <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
              <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Categorgy</b>
                <b>Price</b>
                <b>Action</b>

              </div>
              {
                list.map((item, index) => {
                  return (
                    <div key={index} className='list-table-format'>
                      <img src={`${url}/images/` + item.image} alt="food-images" />
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                      <p>${item.price}</p>
                      <p className='cursor' onClick={() => removeFood(item._id)}>x</p>

                    </div>
                  )

                })
              }
            </div>


          </div>
        )
      }
    </>

  )
}

export default List