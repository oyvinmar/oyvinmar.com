import React from 'react';
import heroImage1920 from '../img/hero-image_1920.jpg';
import heroImage1740 from '../img/hero-image_1740.jpg';
import heroImage1440 from '../img/hero-image_1440.jpg';
import heroImage1120 from '../img/hero-image_1120.jpg';
import heroImage1000 from '../img/hero-image_1000.jpg';
import heroImage960 from '../img/hero-image_960.jpg';
import heroImage800 from '../img/hero-image_800.jpg';
import heroImage640 from '../img/hero-image_640.jpg';
import heroImage480 from '../img/hero-image_480.jpg';
import heroImage320 from '../img/hero-image_320.jpg';

const getSrcSets = () =>
  [
    `${heroImage1920} 1920w`,
    `${heroImage1740} 1740w`,
    `${heroImage1440} 1440w`,
    `${heroImage1120} 1120w`,
    `${heroImage1000} 1000w`,
    `${heroImage960} 960w`,
    `${heroImage800} 800w`,
    `${heroImage640} 640w`,
    `${heroImage480} 480w`,
    `${heroImage320} 320w`,
  ].join(', ');

const Hero = () => (
  <section className="hero" id="home">
    <img
      className="hero__img"
      src={heroImage1920}
      srcSet={getSrcSets()}
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
