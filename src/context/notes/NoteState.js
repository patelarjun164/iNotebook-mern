import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "649592205b0ee53668c40112",
            "user": "64957a0d378e9303cccd6e8a",
            "title": "my-title",
            "description": "wake up at 6'o clock",
            "tag": "personal",
            "date": "2023-06-23T12:37:52.379Z",
            "__v": 0
        },
        {
            "_id": "6495986377a7d0ae50f6d4ce",
            "user": "64957a0d378e9303cccd6e8a",
            "title": "new post",
            "description": "delete route adding in ednpoints",
            "tag": "facebook",
            "date": "2023-06-23T13:04:35.331Z",
            "__v": 0
        },
        {
            "_id": "64959976968272c8ce574d11",
            "user": "64957a0d378e9303cccd6e8a",
            "title": "new post",
            "description": "delete route adding in ednpoints",
            "tag": "facebook",
            "date": "2023-06-23T13:09:10.918Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;