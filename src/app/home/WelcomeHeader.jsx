import React from 'react';

const WelcomeHeader = () =>
  <section className="welcome" id="home">
    <img className="hero__img" src="/assets/img/hero-image_1920.jpg" alt="Beautiful sunset"/>
    <div className="overlay" />
    <div className="container-fluid text-center">
      <header>
        <h1>Hello, I‘m Øyvind</h1>

        <h2>Welcome to my homepage.</h2>
      </header>
    </div>
  </section>;

export default WelcomeHeader;
