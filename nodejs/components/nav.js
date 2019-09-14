import React from "react";
import Link from "next/link";

const Nav = () => (
  <nav>
    <a href="https://decisionmate.app" target="_blank">
      <img src="/static/iso@2x.png" className="logo" alt="my image" />
    </a>
    <style jsx>{`
      nav {
        text-align: center;
        margin-bottom: 1em;
      }
      .logo {
        display: block;
        height: 60px;
        width: 60px;
      }
    `}</style>
  </nav>
);

export default Nav;
