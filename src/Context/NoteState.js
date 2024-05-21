import React,{ useState } from "react";
import NoteContext from "./NoteCotext";

const NoteState = (props) => {

    //host Name
    const host = "http://localhost:5000";

    const [allNote, setAllnote] = useState([]);
    const [LoggedUser, setLoggedUser] = useState(false);


    // ==>  Api 1 Fetch all not for spacific user

      const getAllNotes = async () => {

        const response = await fetch(`${host}/api/note/fetchallnotes`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "token" : localStorage.getItem("token")
                }
            });
            const json = await response.json();
            // console.log( json );
            setAllnote( json );
      }
      

      // ==> API - 2 add new Note

          
      const addNote = async ( title, description, tag ) => {
          const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token" : localStorage.getItem("token")
            },
            body: JSON.stringify({ title , description , tag })
          });
          const json = await response.json();
          console.log(json)
          // return response.json();
      }


      // API 3 = Delete specific Note

    const deletNote = async (id) => {
          
      // Api call
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "token" : localStorage.getItem("token")
            },
          });

        // DELET logic
        const newNote = allNote.filter((single) => { return single._id !== id})
        setAllnote(newNote);

        const json = await response.json();
        console.log(json)
    }


    // API - 4 All note Delete spacific user

    const deleteALLNote = async () => {
          
      const response = await fetch(`${host}/api/note/deleteallnotes`, {
        method: "DELETE",
        headers: {
           "Content-Type": "application/json",
           "token" : localStorage.getItem("token")
          }
      });
      const json = await response.json();
      console.log( json );
   
         
      getAllNotes();
 
    }
     
   
    // API - 5 update note

    const updateNote = async ( note ) => {

      const response = await fetch(`${host}/api/note/updatenote/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem("token")
        },
        body: JSON.stringify({ title:note.title , description:note.description , tag:note.tag })

      });

      const json = await response.json();
      console.log(json)
     
      getAllNotes();
    }

    return(
        <NoteContext.Provider value={ {LoggedUser, setLoggedUser, allNote , setAllnote , getAllNotes , addNote , deletNote , deleteALLNote , updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;