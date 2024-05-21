import AddNote from "./Components/AddNote";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewNote from "./Components/ViewNote";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import NoteState from "./Context/NoteState";
import { useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import Alert from "./Components/Alert";
import User from "./Components/User";



function App() {

  // top lodingbar
  const [progress, setProgress] = useState(0)


const [alert, setAlert] = useState(null);

const showAlert = (message , type) => {

  setAlert({msg:message, type:type})

  setTimeout(() => {
    setAlert(null)
  }, 3000);

}

const prog = (pr)=>{
  setProgress({
    progress:pr
  })
}


  return (
    <>
      <BrowserRouter>
        <NoteState>
        <LoadingBar
            color='#f11946'
            progress={progress}
            height={4}
          />
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Add-Note" element={<AddNote showAlert={showAlert}/>} />
            <Route path="/View-Note" element={<ViewNote/>} />
            <Route path="/Login" element={<Login  showAlert={showAlert} prog={prog}/>} />
            <Route path="/register" element={<Register showAlert={showAlert} />} /> 
            <Route path="/user" element={<User showAlert={showAlert} />} /> 
          </Routes>
          <Footer />
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
