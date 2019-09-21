import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Field from "../components/field";
import TextArea from "../components/textarea";
import Config from "../components/config";
const jwt = require("jsonwebtoken");

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partner_id: Config.partner_id,
      secret: Config.secret,
      base_url: Config.base_url,
      signed_url: "",
      payload:
        '{"share_url":"ee060cc216", "user_email":"ale+test@decisionmate.app", "user_name":"Ale"}'
    };

    this.generateUrl = this.generateUrl.bind(this);
  }

  generateUrl = () => {
    const { partner_id, secret, payload, base_url } = this.state;
    console.log(
      `Generating signed url with partner partner_id “${partner_id}” and payload:`,
      payload
    );
    // Here's where we build the signature, it's one simple line using the `jsonwebtoken` library. This will create a signed token
    // that we can send as a paramter to our partners api.
    // Once the user opens the link it will be automatically signed in and land directly on the specified research.
    var token = jwt.sign(payload, secret, {
      algorithm: "RS256"
    });
    console.log(`Signed Token: ${token}`);
    const signed_url = `${base_url}/api/campaigns/join?partner_id=${partner_id}&token=${token}`;
    this.setState({ signed_url });
  };

  render() {
    const { generateUrl } = this;
    const { partner_id, secret, signed_url, base_url, payload } = this.state;

    return (
      <div>
        <Head>
          <title>Mate partner URL signer API example</title>
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
              <div className="container section">
                <div className="columns">
                  <div className="column is-half">
                    {" "}
                    <h1 className="title">
                      <strong>Mate</strong> partner URL signer API
                    </h1>
                    <p className="subtitle">
                      Sample node.js client signer. To build your own{" "}
                      <a
                        href="https://docs.decisionmate.app/docs/integrations/"
                        target="_blank"
                      >
                        read our documentation
                      </a>
                    </p>
                    <TextArea
                      label="Payload"
                      value={payload}
                      onChange={payload => this.setState({ payload })}
                    ></TextArea>
                    <Field
                      label={"Partner ID"}
                      type={"text"}
                      value={partner_id}
                      onChange={partner_id => this.setState({ partner_id })}
                    />
                    <TextArea
                      label={"Secret Private Key"}
                      value={secret}
                      onChange={secret => this.setState({ secret })}
                    ></TextArea>
                    <Field
                      label={"Base url"}
                      type={"text"}
                      value={base_url}
                      onChange={base_url => this.setState({ base_url })}
                    />
                    <hr />
                    <div className="field">
                      <button className="button is-dark" onClick={generateUrl}>
                        Generate URL
                      </button>
                    </div>
                  </div>
                  <div className="column is-half">
                    <h2 className="title">Signed URL</h2>
                    {signed_url ? (
                      <a href={signed_url} className="url" target="_blank">
                        {signed_url}
                      </a>
                    ) : (
                      <span>
                        Complete the parameters on the form with your partner id
                        and secret combination, then press the “generate signed
                        url” button.
                      </span>
                    )}
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
