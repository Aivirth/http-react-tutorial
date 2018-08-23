import React, { Component } from "react";
import "./Posts.css";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  state = {
    posts: []
  };

  postSelectedHandler = id => {
    this.setState({
      selectedPostId: id
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
        // this.setState({
        //   error: err
        // });
        console.log(err);
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={`/${post.id}`} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}
