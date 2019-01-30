import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      apiUrl: 'https://practiceapi.devmountain.com/api',
      filterSearch: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${this.state.apiUrl}/posts`)
    .then( res => {
      this.setState({posts: res.data});
    }).catch( res => {
      console.error('Couldn not get Posts');
    })
  }

  updatePost(id, updatedText) {
    let editedPost = {
      text: updatedText
    }
    axios.put(`${this.state.apiUrl}/posts/?id=${id}`, editedPost)
    .then( res => {
      this.setState({posts: res.data});
    }).catch( res => {
      console.error(res);
    })
  }

  deletePost(id) {
    axios.delete(`${this.state.apiUrl}/posts/?id=${id}`)
    .then( res => {
      this.setState({posts: res.data})
    }).catch( res => {
      console.error(res.data);
    })
  }

  createPost(text) {
    let newPost = {
      text: text
    }
    axios.post(`${this.state.apiUrl}/posts`, newPost)
    .then( res => {
      this.setState({posts: res.data});
    }).catch( res => {
      console.error(res.data);
    })
  }

  filterSearch = (searchTerm) => {
    this.setState({filterSearch: searchTerm.toLowerCase()});
  }

  render() {
    const { posts } = this.state;
    
    return (
      <div className="App__parent">
        <Header runFn={this.filterSearch} />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          { 
            posts.filter( (element, index)  => {
              return element.text.toLowerCase().includes(this.state.filterSearch);
            }).map( post => {
              return(<Post key={post.id} text={post.text} date={post.date} deletePostFn={this.deletePost} updatePostFn={this.updatePost} id={post.id}/>)
            })
          }
        </section>
        
      </div>
    );
  }
}

export default App;
