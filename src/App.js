import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import BookComponent from './components/Book/BookComponent';
import BookDetailsComponent from './components/BookDetails/BookDetailsComponent';
import CartComponent from './components/Cart/CartComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import HomeComponent from './components/Home/HomeComponent';
import PageNotFoundComponent from './components/NotFound/PageNotFoundComponent';
import PleaseLoginComponent from './components/PleaseLogin/PleaseLoginComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import ReviewsComponent from './components/Reviews/ReviewsComponent';
import WishListComponent from './components/WishList/WishListComponent';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Signin from './Pages/SigninPgae/Signin';
import { BooksFromCartService } from './services/BookServices';
import { GetAddressService } from './services/UserServices';

function App() {
  const [loginToken, setLoginToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])
  useEffect(() => {
    if (loginToken) {
      UserAddress()
      UserCart()
    }
  }, [])
  const UserAddress = () => {
    GetAddressService().then((res) => {
      setUser(res.data.data)
    }).catch((e) => {
      console.log(e.response.data.response)
    })
  }

  const UserCart = () => {
    BooksFromCartService().then((res) => {
      setCart(res.data.data)
    }).catch((e) => {
      console.log(e.response.data)
    })
  }
  if (!loginToken) {
    return (
      <BrowserRouter>
        <HeaderComponent username="Welcome" cartLength='' />
        <Routes>
          <Route exact path="/home" element={<HomeComponent />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path='/bookdetails/:id' element={<BookDetailsComponent />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/pleaselogin" exact element={<PleaseLoginComponent />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <>
      <BrowserRouter>
        <HeaderComponent username={user.name} cartLength={cart.length} />
        <Routes>
          <Route exact path="/home" element={<HomeComponent />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path='/book' element={<BookComponent />} />
          <Route exact path='/bookdetails/:id' element={<BookDetailsComponent UserCart={UserCart} />} />
          <Route exact path='/reviews' element={<ReviewsComponent />} />
          <Route exact path='/notfound' element={<PageNotFoundComponent />} />
          <Route exact path='/profile' element={<ProfileComponent user={user} UserAddress={UserAddress} />} />
          <Route exact path='cart' element={<CartComponent cart={cart} UserCart={UserCart} user={user} />} />
          <Route exact path='/favorite' element={<WishListComponent />} />
          <Route exact path='/orders' element={<WishListComponent />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
