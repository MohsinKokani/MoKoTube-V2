
import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ChannelDetais, VideoDetails, NavBar, HorizontalNav, History, PlayListDetails, SearchFeed, Login } from './Components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FetchFromApi from './utils/FetchFromApi';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    if (loggedIn === 'true' && loginTime) {
      const currentTime = Date.now();
      const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const timeSinceLogin = currentTime - parseInt(loginTime);
      
      if (timeSinceLogin < oneDayInMs) {
        // Session is still valid
        setIsLoggedIn(true);
      } else {
        // Session expired, clear login data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleApiError = (error) => {
    let message = '';
    if (error?.code === "ERR_NETWORK") {
      message = "Please connect to Internet";
    } else {
      message = error?.response?.data?.message || error?.message || "Unknown error";
    }
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleApiCall = (url, setter, TokenSetter, setLoading) => {
    FetchFromApi(url)
      .then((data) => {
        if (data?.error) {
          setLoading(false);
          handleApiError(data.error);
          return;
        }
        setter(data);
        TokenSetter?.(data?.continuation || '');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      })
  }

  const handleScroll = (setVideos, setNextToken, url, setLoading, LockReference) => {
    // User has scrolled to the bottom of the page, fetch the next page of data
    FetchFromApi(url)
      .then((data) => {
        if (data?.error) {
          handleApiError(data.error);
          setLoading?.(false);
          LockReference.lock = 1;
          return;
        }
        setVideos((prevVideos) => {
          return { ...prevVideos, data: [...prevVideos.data||[], ...data.data] };
        });
        setNextToken?.(data?.continuation || '');
        setLoading?.(false);
        if (LockReference !== undefined) LockReference.lock = 1;
      })
      .catch((error) => {
        handleApiError(error)
        setLoading?.(false);
        if (LockReference !== undefined) LockReference.lock = 1;
      })
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HorizontalNav handleApiCall={handleApiCall} handleScroll={handleScroll} />} />
          <Route path='/video/:id' element={<VideoDetails handleApiCall={handleApiCall} handleScroll={handleScroll} />} />
          <Route path='/playlist/:id' element={<PlayListDetails handleApiCall={handleApiCall} handleScroll={handleScroll} />} />
          <Route path='/search/:searchedTerm' element={<SearchFeed handleApiCall={handleApiCall} handleScroll={handleScroll} />} />
          <Route path='/history' element={<History />} />
          <Route path='/channel/:id' element={<ChannelDetais handleApiCall={handleApiCall} handleScroll={handleScroll} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}
export default App;