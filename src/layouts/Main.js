import React from 'react';
import {Outlet} from 'react-router-dom';
import Aside from '../shared/Aside';
import Footer from '../shared/Footer';
import Header from '../shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div>
                <Aside></Aside>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;