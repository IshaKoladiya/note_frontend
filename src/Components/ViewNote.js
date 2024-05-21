import React, { useContext, useEffect, useRef ,useState} from 'react';
import Header from './Header';
import SingleNote from './SingleNote';
import NoteContext from '../Context/NoteCotext';
import { useNavigate } from 'react-router-dom';


export default function ViewNote() {

  // blank note
  const [notedata, setNotedata] = useState({id:"" , title:"", description:"" , tag:""});

  // context data
  let data = useContext(NoteContext)
  const { LoggedUser,allNote, getAllNotes, deleteALLNote , updateNote } = data;

  // check user is login or not
  const nevigate = useNavigate();

    useEffect(() => {

      getAllNotes();
      // update();
       // eslint-disable-next-line 
    }, []);

    useEffect(() => {
      if(!LoggedUser){
        // eact-hooks/exhaustive-deps
        nevigate("./Login"); 
       } // eslint-disable-next-line
    }, [])
    

    // update method
    
    // create refrance
    const refModel = useRef('');
    const refClose = useRef('');

    // open model and set note data in form

    const getNoteDetail = ( currentNote ) => {

    //  open model

    refModel.current.click();

      //  note data
      console.log(currentNote)
      setNotedata({id: currentNote._id, title:currentNote.title, description:currentNote.description, tag:currentNote.tag})
      }

      //  chenge formdata

      const onChenge = (e) =>{
        setNotedata({...notedata,[e.target.name]:e.target.value})
      }

  // click on edite note

  const handleClick = () => {
    // update note data and call api
    // console.log(notedata)
    updateNote( notedata );

    refClose.current.click();
  }

  return (
    <>
        <Header title="View All Note" desc="Hello User,your All Notes From Clouds."/>
        <div className="container">
          <div className="row">
            <button className='btn m-4 p-2 and' style={{width:'200px', boxShadow:"3px 3px 0px grey"}} onClick={ () => {deleteALLNote()}} > All Note Delete <i className="fa-solid fa-trash position-absolute p-1 ms-2"></i></button>
          </div>
          <div className="row">
              {/* <h1>Name is :{data.name} and sallary is : {data.sallary}</h1> */}
              {/* <h1>Name is :{data.state.name} and sallary is : {data.state.sallary}</h1> */}
              {allNote.length === 0 && ( <div className='col text-center my-5'><h1 style={{color:"#ddd"}}>Not Note Found <i className="fa-regular fa-face-smile fx-3"></i></h1></div>)}
            { allNote.length > 0  &&  allNote.map((single) => {
                return <SingleNote key={single._id} title={single.title} discription={single.description} tag={single.tag} id={single._id} single={single} upnotedata={getNoteDetail}/>
              })
            }
          </div>
          {/*  Button trigger modal  */}
      <button ref={refModel} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
            {/*  Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edite Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">  
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
                      </form>
                    </div>
                  </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Save</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}
