
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ChannelDetais, VideoDetails, NavBar, HorizontalNav, History, ShowError, PlayListDetails, SearchFeed } from './Components';
import FetchFromApi from './utils/FetchFromApi';

const App = () => {

  const [errorStatus, setErrorStatus] = useState({
    present: false,
    code: 0,
    message: ""
  });

  const handleApiError = (error) => {
    if (error?.code === "ERR_NETWORK") {
      setErrorStatus({
        present: true,
        code: 0,
        message: "Please connect to Internet"
      })
    } else {
      setErrorStatus({
        present: true,
        code: error?.response.status,
        message: error?.response.data.message
      })
    }
  }

  const handleApiCall = (url, setter, TokenSetter, setLoading) => {
    FetchFromApi(url)
      .then((data) => {
        if (data?.error) {
          setLoading(false);
          setErrorStatus({ present: true, code: data.error.code, message: data.error.message });
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
          setErrorStatus({ present: true, code: data.error.code, message: data.error.message });
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
      {
        errorStatus.present && <ShowError errorStatus={errorStatus} setErrorStatus={setErrorStatus} />
      }
    </>
  )
}
export default App;