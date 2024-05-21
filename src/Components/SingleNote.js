import React,{useContext} from 'react'
import NoteContext from '../Context/NoteCotext';


export default function SingleNote(props) {

  let data = useContext(NoteContext);
  const {deletNote} = data;

  // props
  const {title, discription, tag , id , single , upnotedata} = props;
  
  return (
    <>
    <div className="col-4 my-3">
      <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item position-relative">{title}
            <i className="fa-solid fa-trash position-absolute" onClick={ () => {deletNote(id)}} style={{right:"10px", top:"20px",cursor:"pointer"}} title='Delete'></i>
            <i className="fa-solid fa-pen-to-square position-absolute" onClick={ () => {upnotedata(single)}} style={{right:"40px", top:"20px",cursor:"pointer"}} title='Edite'></i>
            {/* onClick={ () => {getNoteDetail(single)}} */}
            </li>
            <li className="list-group-item">{discription}</li>
            <span className="position-absolute top-0  end-0  translate-middle badge rounded-pill" style={tag  === "personal"?{background:"red",color:"white"}:{background:"green",color:"white"}}>
              {tag}
            </span>
          </ul>
        </div>
    </div>
    </>
  )
}
