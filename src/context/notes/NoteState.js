import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    //eslint-disable-next-line
    const [notes, setNotes] = useState(notesInitial);
    //eslint-disable-next-line
    const [alert, setalert] = useState(null);

    const showAlert = (message, type) => {
        setalert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setalert(null);
        }, 1500);
    }

    //Get all note
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        //Client side adding
        // console.log(json);
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //TODO: API call
        //API call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }),
        });
        //Client side adding
        let note = await response.json();
        setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = await response.json()
          console.log(json);
        //Client Side
        // console.log("delete note with id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API CAll
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }),
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;