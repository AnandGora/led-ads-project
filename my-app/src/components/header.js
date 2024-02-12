import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="logosec">
        <div className="logo">Led Ads</div>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="message">
        <div className="dp">
          <i className="fa-solid fa-user text-white"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;