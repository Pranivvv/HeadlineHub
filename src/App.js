import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import React, { useState,} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = ()=> {
  // constructor() {
  //   super();
  //   this.state = {
  //     mode: 'light',
  //     apiKey: process.env.REACT_NEWSAPP_NEWS_APIKEY,
  //     pageSize: 8,
  //     country: 'us',
  //     category: 'general',
  //     progress: 0
  //   };
  // }
  const apiKey = process.env.REACT_NEWSAPP_NEWS_APIKEY
  const pageSize = 8
  const country = 'us'
  const [mode,setMode] = useState('light')
  // const [category,setCategory] = useState('general')
  const [progress,setProgress] = useState(0)


  

  const changeMode = () => {
    if (mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor = '#212529'
      document.body.style.color = '#fff'
    }else{
      setMode('light')
      document.body.style.backgroundColor = '#fff'
      document.body.style.color = '#212529'
    }
  };

    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    const routes = categories.map((category) => ({
      path: category === 'general' ? '/' : `/${category}`,
      element: (
        <>
          <Navbar mode={mode} changeMode={changeMode} />
          <News
            setProgress={setProgress}
            key={category+pageSize}
            mode={mode}
            apiKey={apiKey}
            pageSize={pageSize}
            country={country}
            category={category}
          />
        </>
      ),
    }));

    const router = createBrowserRouter(routes);

    return (
      <>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <RouterProvider router={router} />
      </>
    );
  
}

export default App