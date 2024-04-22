import React, { useState } from 'react';
import { CircleLoader } from 'react-spinners';
import './Loading.css';
import background from '../Assets/bg.mp4';

function Loading() {
  return (
    <div className="Loading">
      <video className='bgVideo' autoPlay loop muted>
        <source src={background} type='video/mp4' />
      </video>
      <div className="overlay"></div>
      <div className='loadingContent'>
        <CircleLoader
          color={"#ffffff"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
        Loading...
      </div>

    </div>
  );
}

export default Loading;