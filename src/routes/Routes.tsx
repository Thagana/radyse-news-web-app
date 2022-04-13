import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoutes';

import SignIn from '../views/Auth/SignIn';
import Verify from '../views/Auth/Verify';
import Home from '../views/Home';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PrivateRoute />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='/login' element={<SignIn />} />
                <Route path='/verify' element={<Verify />} />
            </Routes>
        </Router>
    )
}
