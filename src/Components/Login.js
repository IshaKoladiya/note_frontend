import React,{ useContext , useState, useRef}  from 'react'
import Header from './Header'
import NoteContext from '../Context/NoteCotext'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {

  
  // blank
  const [user, setUser] = useState({email:"", password:""});

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
    props.prog(30);
    refBtn.current.setAttribute('disabled', 'true');
    props.showAlert("plese Wait...!" , "warning")
    props.prog(60);
    
    // API call
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email:user.email , password:user.password })

      });
      props.prog(80);
      // console.log("prog>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",prog);
      const json = await response.json();
      console.log(json)
     
      if(json.flag){
        // save token and save state and then rederect ti view note
        localStorage.setItem('token', json.token);
        setLoggedUser(true);
        navigate("/View-Note");
        refBtn.current.removeAttribute('disabled');
        props.showAlert("Acount login successfulliy" , "success")
        props.prog(100)
      }
      else{
        props.showAlert("Invalid Details","danger");
        refBtn.current.removeAttribute('disabled'); 
      }
  };

  // chenge form data
  const onChenge = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  return (
    <>
        <Header title="Login" desc="If you have account then login here."/>
         {/* <h1>name: {mom.state.name} , sallary:{mom.state.sallary}</h1> */}
        <div className="container">
        <div className="row my-4">
          <div className="col-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleClick}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChenge} value={user.email}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="password" onChange={onChenge} value={user.password}/>
                  </div>
                  <div className="d-grid gap-2">
                      <button ref={refBtn} disabled={user.email.length === 0 || user.password.length === 0} className="btn btn-primary" type="submit">Login</button>
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
