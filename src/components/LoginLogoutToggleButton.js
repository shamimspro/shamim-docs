import React from 'react';
import {useContext} from 'react';
import {AuthContext} from '../contexts/UserContext';

const LoginLogoutToggleButton = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
            <button className='bg-blue-700 hover:bg-blue-600 text-blue-50 px-2 py-1 rounded-md'>
                {
                    user?.uid
                        ? 'Logout'
                        : 'Login'
                }
            </button>
        </>
    );
};

export default LoginLogoutToggleButton;