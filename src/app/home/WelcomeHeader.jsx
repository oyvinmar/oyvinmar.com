import React, { PropTypes } from 'react';

const WelcomeHeader = () => {
  return (
    <section className="welcome" id="home">
        <div className="overlay">
        </div>
        <div className="container-fluid text-center">
            <header>
                <h1>Hello, I'm Øyvind</h1>

                <h2>Welcome to my homepage.</h2>
            </header>
        </div>
    </section>
  );
};

export default WelcomeHeader;
