import React from 'react'
import './AppDowloads.css'
import { assets } from '../../assets/frontend_assets/assets'

const AppDowloads = () => {
    return (
        <div className='app-dowload' id='app-download'>
            <p>For Better Experience Download <br />Tomato App </p>
            <div className="app-dowloads-paltforms">
                <img src={assets.play_store} alt="play_store" />
                <img src={assets.app_store} alt="app_store" />
            </div>

        </div>
    )
}

export default AppDowloads