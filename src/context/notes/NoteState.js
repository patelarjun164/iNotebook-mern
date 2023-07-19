import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    //eslint-disable-next-line
    const [notes, setNotes] = useState(notesInitial);

    //Get all note
    const getNotes = async ()=> {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NTdhMGQzNzhlOTMwM2NjY2Q2ZThhIn0sImlhdCI6MTY4NzUxNzcwOX0.Q1wrCj0HStKEG52mlrH_CcvSEQvw-JKp7G9QHbl17HI"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          const json = await response.json();
        //Client side adding
        console.log(json);
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag)=> {
        //TODO: API call
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NTdhMGQzNzhlOTMwM2NjY2Q2ZThhIn0sImlhdCI6MTY4NzUxNzcwOX0.Q1wrCj0HStKEG52mlrH_CcvSEQvw-JKp7G9QHbl17HI"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}),
          });
          const json =  response.json();
        //Client side adding
        const note = {
            "_id": "649599762c8ce5744d11",
            "user": "64957a0d378e9303cccd6e8a",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-06-23T13:09:10.918Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote = (id)=> {
        //TODO: API call
        console.log("delete note with id " + id);
        const newNotes = notes.filter((note)=> {return note._id!==id})
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag)=> {
        //API CAll
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5NTdhMGQzNzhlOTMwM2NjY2Q2ZThhIn0sImlhdCI6MTY4NzUxNzcwOX0.Q1wrCj0HStKEG52mlrH_CcvSEQvw-JKp7G9QHbl17HI"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}),
          });
          const json =  response.json();
        
        //Logic to edit client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;