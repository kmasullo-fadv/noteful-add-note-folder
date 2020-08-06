import React from 'react'
import NotefulForm from './NotefulForm/NotefulForm'
import ApiContext from './ApiContext'
import config from './config'

export default class AddNote extends React.Component {

    static contextType = ApiContext;

    handleClickAddNote = e => {
        e.preventDefault();
        const newNoteName = e.target.newNoteName.value;
        const newNoteContent = e.target.newNoteContent.value;
        const selectedFolder = e.target.folderSelectMenu.value;
        const todaysDate = new Date();
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify({
                name: newNoteName, 
                modified: todaysDate,
                folderId: selectedFolder,
                content: newNoteContent,
            }),
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
              this.context.addNote(data)
            })
            .catch(error => {
              console.error({ error })
            });
            this.props.history.push(`/`)
    }

    render(){
        const { folders=[] } = this.context;
        return(
            <NotefulForm className="newNoteForm" onSubmit={this.handleClickAddNote}>
                <label htmlFor="folderSelectMenu">Select Folder: </label>
                <select id="folderSelectMenu" name="folderSelectMenu">
                    {folders.map(folder => <option value={folder.id} key={folder.id}>{folder.name}</option> )}
                </select>
                <label htmlFor="newNoteName">Name: </label>
                <input type="text" id="newNoteName" name="newNoteName" required/>
                <label htmlFor="newNoteContent">Note: </label>
                <textarea id="newNoteContent" rows="14" cols="10" wrap="soft" name="newNoteContent"/>
                <button type="submit">Save</button>
            </NotefulForm>
        )
    }
}