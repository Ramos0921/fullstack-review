import React from 'react'


const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ol>
      {props.repos.map((repo) => {
        return (
          <div key = {repo._id}>
            <li><strong>Repo Name: </strong><a href ={repo.url} target = "_blank">{repo.name}</a>
              <ul>
                <li>Creator: {repo.user}</li>
                <li>Views: {repo.views}</li>
              </ul>
            </li>
          </div>
        )
      })}
    </ol>
  </div>
)


export default RepoList;