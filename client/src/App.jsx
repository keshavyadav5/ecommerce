import React, { use, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShooppingHome from './pages/shopping-view/home'
import ShooppingListing from './pages/shopping-view/listing'
import ShooppingCheckout from './pages/shopping-view/checkout'
import ShooppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-sliece'
import { Skeleton } from "@/components/ui/skeleton"

const App = () => {

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div className='w-full h-screen flex items-center justify-center'>
     <span class="loader"></span>
    </div>
  }


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
    <Routes>
    <Route path="/" 
      element={<HomePage />}
    />
    </Routes>
      <Routes>
        <Route
          path='/auth'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          } >
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route
          path='/admin'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        <Route
          path='/shop'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          } >
          <Route path='home' element={<ShooppingHome />} />
          <Route path='listen' element={<ShooppingListing />} />
          <Route path='checkout' element={<ShooppingCheckout />} />
          <Route path='account' element={<ShooppingAccount />} />
        </Route>

        <Route path='/unauth-page' element={<UnauthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App


export const HomePage = () => {
  return(
    <p>home page</p>
  )
}