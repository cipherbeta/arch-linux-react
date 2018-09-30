import React from 'react';

import Header from './components/common/header';
import Routes from './routes/';

const Layout = () => (
    <React.Fragment>
        <Header/>
        <div id="page_wrapper">
            <Routes/>
        </div>
        
    </React.Fragment>
);

export default Layout;