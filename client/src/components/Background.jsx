import React from 'react'
import background from "../assets/back.svg";

const Background = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -100,
      }}
    />
  );
};

export default Background;