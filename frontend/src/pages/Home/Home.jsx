import React, { useState } from 'react'

import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Header from '../../components/Header'
import './Home.css'
import AppDowloads from '../../components/AppDowloads/AppDowloads'

const Home = () => {

  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDowloads />
    </div>
  )
}

export default Home