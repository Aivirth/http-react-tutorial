import React, { Component } from "react";

import "./Blog.css";
//import axios from "axios";
import { Route, Switch, NavLink as Link, Redirect } from "react-router-dom";
import asyncComponent from "../../hoc/asyncComponent";

import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: false
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/posts" exact activeClassName="active">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>home</h1>} /> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          {/* <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" /> */}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
