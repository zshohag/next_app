import React from 'react';
import Products from './Products';
import Banner from './Banner';

const Homepage = () => {
    return (
        <div className='bg-white' >
            <Banner/>
            <Products/>
        </div>
    );
};

export default Homepage;

