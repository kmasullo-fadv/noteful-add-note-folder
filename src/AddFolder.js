import React from 'react'
import NotefulForm from './NotefulForm/NotefulForm'
import ApiContext from './ApiContext'
import config from './config'

export default class AddFolder extends React.Component {

    static contextType = ApiContext;

    handleClickAddFolder = e => {
        e.preventDefault()
        const folderName = e.target.newFolderName.value;
        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',
          body: JSON.stringify({name: folderName}),
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then((data) => {
            this.context.addFolder(data)
          })
          .catch(error => {
            console.error({ error })
          });
          this.props.history.push(`/`)
      }

    render(){

        return(
            <NotefulForm className="newFolderForm" onSubmit={this.handleClickAddFolder}>
                <label htmlFor="newFolderName">Name: </label>
                <input type="text" id="newFolderName" name="newFolderName" required/>
                <button type="submit">Save</button>
            </NotefulForm>
        )
    }
}