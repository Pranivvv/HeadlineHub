import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import React, { Component } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'light',
      apiKey: process.env.REACT_NEWSAPP_NEWS_APIKEY,
      pageSize: 8,
      country: 'us',
      category: 'general',
      progress: 0
    };
  }

  changeMode = () => {
    this.setState((prevState) => {
      const newMode = prevState.mode === 'light' ? 'dark' : 'light';
      document.body.style.backgroundColor = newMode === 'dark' ? '#212529' : '#fff';
      document.body.style.color = newMode === 'dark' ? '#fff' : '#212529';
      return { mode: newMode };
    });
  };

  setProgress = (progress) => {
    this.setState({ progress })
  }

  render() {
    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    const routes = categories.map((category) => ({
      path: category === 'general' ? '/' : `/${category}`,
      element: (
        <>
          <Navbar mode={this.state.mode} changeMode={this.changeMode} />
          <News
            setProgress={this.setProgress}
            key={category}
            mode={this.state.mode}
            apiKey={this.state.apiKey}
            pageSize={this.state.pageSize}
            country={this.state.country}
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
          progress={this.state.progress}
        />
        <RouterProvider router={router} />
      </>
    );
  }
}
