import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Field from "../components/field";
import Config from "../components/config";
const jwt = require("jsonwebtoken");

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: Config.key,
      secret: Config.secret,
      user_name: Config.name,
      user_email: Config.email,
      share_url: Config.share_url,
      base_url: Config.base_url,
      signed_url: ""
    };

    this.generateUrl = this.generateUrl.bind(this);
  }

  generateUrl = () => {
    const {
      key,
      secret,
      user_name,
      user_email,
      share_url,
      base_url
    } = this.state;
    const payload = {
      user_name: user_name,
      user_email: user_email,
      share_url: share_url
    };
    console.log(
      `Generating signed url with partner key “${key}” and payload:`,
      payload
    );
    // Here's where we build the signature, it's one simple line using the `jsonwebtoken` library. This will create a signed token
    // that we can send as a paramter to our partners api.
    // Once the user opens the link it will be automatically signed in and land directly on the specified research.
    var token = jwt.sign(payload, secret, {
      algorithm: "HS256"
    });
    console.log(`Signed Token: ${token}`);
    const signed_url = `${base_url}/api/campaigns/join?key=${key}&token=${token}`;
    this.setState({ signed_url });
  };

  render() {
    const { generateUrl } = this;
    const {
      key,
      secret,
      user_name,
      user_email,
      share_url,
      signed_url,
      base_url
    } = this.state;

    return (
      <div>
        <Head>
          <title>Mate partner API example</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
          />
        </Head>
        <div>
          <section className="hero is-medium">
            <div className="hero-head section">
              <Nav />
            </div>
            <div className="hero-body">
              <div className="container">
                <div className="columns">
                  <div className="column is-half">
                    {" "}
                    <h1 className="title">
                      <strong>Mate</strong> partner API
                    </h1>
                    <p className="subtitle">Sample node.js integration</p>
                    <Field
                      label={"Campaign ID"}
                      type={"text"}
                      value={share_url}
                      onChange={share_url => this.setState({ share_url })}
                    />
                    <Field
                      label={"name"}
                      type={"name"}
                      value={user_name}
                      onChange={user_name => this.setState({ user_name })}
                    />
                    <Field
                      label={"email"}
                      type={"email"}
                      value={user_email}
                      onChange={user_email => this.setState({ user_email })}
                    />
                    <Field
                      label={"key"}
                      type={"text"}
                      value={key}
                      onChange={key => this.setState({ key })}
                    />
                    <Field
                      label={"secret"}
                      type={"password"}
                      value={secret}
                      onChange={secret => this.setState({ secret })}
                    />
                    <Field
                      label={"base url"}
                      type={"text"}
                      value={base_url}
                      onChange={base_url => this.setState({ base_url })}
                    />
                    <div className="field">
                      <button className="button is-dark" onClick={generateUrl}>
                        Generate URL
                      </button>
                    </div>
                  </div>
                  <div className="column is-half">
                    <h2 className="title">Signed URL</h2>
                    <a href={signed_url} className="url" target="_blank">
                      {signed_url}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <style jsx>{`
          a.url {
            word-break: break-all;
          }
        `}</style>
      </div>
    );
  }
}
