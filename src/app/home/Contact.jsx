import React, { Component } from 'react';

class Contact extends Component {
  componentDidMount() {
    const name = 'oyvinmar';
    const domain = 'gmail.com';
    const addr = `${name}@${domain}`;
    window
      .jQuery('#email')
      .append(
        `<i class="fa fa-envelope"></i> <a href="mailto:${addr}">${addr}</a>`,
      );
  }

  render() {
    return (
      <section className="section" id="contact">
        <div className="container">
          <header className="row section-header">
            <h2>Contact</h2>
            <hr />
          </header>
          <div className="row">
            <div className="col-md-12">
              <p>
                You can reach me on all the social networks listed above. Or if
                you prefer old school email:&nbsp;
                <span id="email" />
              </p>
            </div>
          </div>
          <footer className="row">
            <p>© 2014 Øyvind Marthinsen</p>
          </footer>
        </div>
      </section>
    );
  }
}

Contact.propTypes = {};

export default Contact;
