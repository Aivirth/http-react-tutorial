import React, { Component } from "react";
import "./Posts.css";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";

export default class Posts extends Component {
  state = {
    posts: []
  };

  postSelectedHandler = id => {
    // this.setState({
    //   selectedPostId: id
    // });

    this.props.history.push({
      pathname: `/posts/${id}`
    });
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({
          posts: updatedPosts
        });
      })
      .catch(err => {
        this.setState({
          error: err
        });
        console.log(err);
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={`/${post.id}`} >
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}
