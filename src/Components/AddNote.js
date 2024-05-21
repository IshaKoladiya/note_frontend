import React, { useContext,useState,useEffect } from "react";
import Header from "./Header";
import NoteContext from "../Context/NoteCotext";
import { useNavigate } from "react-router-dom";


export default function AddNote(props) {

  const {showAlert} = props;

const [notedata, setNotedata] = useState( {title:"", description:"", tag:"General"} );
const data = useContext(NoteContext);
const {LoggedUser, addNote} = data;

const navigate = useNavigate();

// check user login or not

useEffect(() => {
 if( !LoggedUser){
  navigate('/Login');
 }
}, [])


const onChenge = (e) =>{
  setNotedata({...notedata,[e.target.name]:e.target.value});
}

// console.log(onchange);

const handleClick = () => { 
  addNote(notedata.title, notedata.description, notedata.tag);
   // eslint-disable-next-line
  setNotedata({ title:"" , description:"" , tag:"General" });
  showAlert("Note Add successfulliy" , "success");
}


  return (
    <>
      <Header
        title="Add New Note"
        desc="Hello User, Add your Personal data on clouds"
      />
      <div className="container">
        <div className="row my-4">
          <div className="col-6 mx-auto">
            <div className="card">
              <div className="card-body">
              <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={onChenge} value={notedata.title} aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Description</label>
                    <textarea className="form-control" style={{resize:"none"}} name="description" onChange={onChenge} value={notedata.description}></textarea>
                  </div>
                  <div className="mb-3 form-check">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="tag" onChange={onChenge} value="General" checked={notedata.tag === "General" ? true : false}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">General</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="tag" onChange={onChenge} value="personal" checked={notedata.tag === "personal" ? true : false}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Personal</label>
                  </div>
                  </div>
                  <div className="d-grid gap-2">
                      <button className="btn btn-primary" type="button" onClick={handleClick}>Add Note</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
