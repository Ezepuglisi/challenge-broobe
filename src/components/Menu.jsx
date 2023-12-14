import React from 'react'
import { SlLogout } from "react-icons/sl";
import { LuUser2 } from "react-icons/lu";
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


const Menu = () => {

    const { user, logout } = useAuth()

    return (
        <div className='navbar'>
            <div style={{display:'flex', flexDirection:'row', gap:'5px'}}><LuUser2 /><p>{user.username || user}</p></div>
            <SlLogout onClick={() => logout()} />
        </div>

    )
}

export default Menu