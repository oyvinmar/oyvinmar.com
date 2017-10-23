import React from 'react';

const getSrcSets = imagePath =>
  [
    `${imagePath}_1920.jpg 1920w`,
    `${imagePath}_1740.jpg 1740w`,
    `${imagePath}_1440.jpg 1440w`,
    `${imagePath}_1120.jpg 1120w`,
    `${imagePath}_1000.jpg 1000w`,
    `${imagePath}_960.jpg 960w`,
    `${imagePath}_800.jpg 800w`,
    `${imagePath}_640.jpg 640w`,
    `${imagePath}_480.jpg 480w`,
    `${imagePath}_320.jpg 320w`,
    `${imagePath}_320.jpg 320w`,
  ].join(', ');

const Hero = () => (
  <section className="hero" id="home">
    <img
      className="hero__img"
      src="/assets/img/hero-image_1920.jpg"
      srcSet={getSrcSets('/assets/img/hero-image')}
      sizes="(min-width: 150px) 150px, 100vw"
      alt="Beautiful sunset"
    />
    <div className="overlay" />
    <div className="hero__heading text-center">
      <header>
        <h1>Hello, I‘m Øyvind</h1>

        <h2>Welcome to my homepage.</h2>
      </header>
    </div>
  </section>
);

export default Hero;
