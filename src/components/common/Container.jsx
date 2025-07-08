import React from 'react';

const Container = ({children}) => {
    return (
        <div className='max-w-11/12 lg:max-w-10/12 mx-auto'>
            {children}
        </div>
    );
};

export default Container;