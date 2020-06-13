import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount(){
    fetch('http://localhost:1128/repos')
      .then(data => data.json())
      .then((repos)=>{
        console.log('initial fetch works')
        this.setState({
          repos: repos
        })
      })
  }


  search (term) {

    axios.post('http://localhost:1128/repos',{username: term})
      .then((repo)=>{
        console.log('new user post works')
      })
      .then(()=>{
        fetch('http://localhost:1128/repos')
        .then(data => data.json())
        .then((repos)=>{
          console.log('fetch after post works')
          this.setState({
            repos: repos
          })
        })
        .catch((err)=>{
          console.log(err);
        })
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));