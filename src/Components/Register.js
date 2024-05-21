import React,{ useContext , useState, useRef}  from 'react'
import Header from './Header'
import NoteContext from '../Context/NoteCotext'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

  // alert
const {showAlert} = props;

  // blank
  const [user, setUser] = useState({name:"",  email:"", password:""});

  // create refBtn
  const refBtn = useRef('');

  // context data
  let data = useContext(NoteContext);
  const {setLoggedUser} = data;

  //create navigate
  const navigate = useNavigate('');


  // click on login button
  const handleClick = async (e) => {
    e.preventDefault();

    refBtn.current.setAttribute('disabled', 'true');
    showAlert("plese wait..." , "warning")
    

    // API call
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name:user.name, email:user.email , password:user.password })

      });

      const json = await response.json();
      console.log(json)
     
      if(json.flag){
        // save token and save state and then rederect ti view note
        localStorage.setItem('token', json.token);
        setLoggedUser(true);
        navigate("/View-Note");
        showAlert("Registration successfully..." , "success")
        refBtn.current.removeAttribute('disabled');
        
      }
      else{
        showAlert("Invelid Email or password","danger");
        refBtn.current.removeAttribute('disabled');
      }
  };

  // chenge form data
  const onChenge = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  return (
    <>
        <Header title="Register" desc="If you dont'have account then register here." />
      
        <div className="container">
        <div className="row my-4">
          <div className="col-6 mx-auto">
            <div className="card">
              <div className="card-body">
              <form onSubmit={handleClick}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" onChange={onChenge} value={user.name}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChenge} value={user.email}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="password" onChange={onChenge} value={user.password}/>
                  </div>
                  <div className="d-grid gap-2">
                      <button ref={refBtn} disabled={user.name.length < 3 || user.email.length < 5 || user.password.length < 5} className="btn btn-primary" type="submit">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  )
}
