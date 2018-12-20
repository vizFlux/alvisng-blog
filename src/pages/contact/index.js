// @flow

import React from 'react';
// eslint-disable-next-line
import { navigate } from 'gatsby-link';
import Layout from '../../components/Layout';

type Props = {};

type State = {};

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}= ${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class Index extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    // eslint-disable-next-line
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      // eslint-disable-next-line
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Contact</h1>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  {/* eslint-disable-next-line */}
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  {/* eslint-disable-next-line */}
                  <label className="label" htmlFor={'name'}>
                    Your name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      id="name"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  {/* eslint-disable-next-line */}
                  <label className="label" htmlFor={'email'}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      id="email"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  {/* eslint-disable-next-line */}
                  <label className="label" htmlFor={'message'}>
                    Message
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="message"
                      onChange={this.handleChange}
                      id="message"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}