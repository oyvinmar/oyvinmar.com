import React from 'react';

const About = () => (
  <div className="section" id="about">
    <section className="container">
      <header className="row section-header">
        <h2>About me</h2>
        <hr />
      </header>
      <section className="row">
        <div className="col-md-12">
          <img
            alt="Øyvind Marthinsen"
            id="headshot"
            src={'/assets/img/Oyvind-Marthinsen.jpg'}
          />
        </div>
      </section>
      <section className="row">
        <div className="col-sm-offset-3 col-sm-6">
          <p>
            I‘m a Norwegian developer and web enthusiast living in Oslo. Currently I‘m working as a consultant at
            {' '}
            <a href="http://knowit.no" rel="external">Knowit</a>
            , where I‘m able to work on cool things. In my spear time I enjoy watching football (the British kind), and love going skiing in the winter.
            {' '}
          </p>
        </div>
      </section>
    </section>
  </div>
);

About.propTypes = {};

export default About;
