import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoutes';

import SignIn from '../views/Auth/SignIn';
import Verify from '../views/Auth/Verify';
import Home from '../views/Home';
import Subscription from '../views/Subscription';
import Profile from '../views/Profile';
import Save from '../views/Save';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PrivateRoute />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/save' element={<Save />} />
                    <Route path='/subscription' element={<Subscription />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/login' element={<SignIn />} />
                <Route path='/verify-code' element={<Verify />} />
            </Routes>
        </Router>
    )
}
