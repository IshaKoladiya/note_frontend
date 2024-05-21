import React,{ useState,useEffect } from 'react'



export default function User() {

    const [user, setUser] = useState({email:"" , date:"" , name:""})

const handleClick = async () => {
    // e.preventDefault();

    // API call
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/user/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem("token")
        },
      });

      const json = await response.json();
      console.log(json)

      setUser(json.user)
    };

    

    useEffect(() => {
      handleClick();
    }, [])
    


  return (
    <div>
      <div className="container">
        <div className="row m-5 justify-content-center">
            <div className="col-8 my-5 ">
            <div className="card" style={{background:"#d3d3d3",textShadow:"0px 0px 10px grey", color:"white"}}>
                    <div className="card-body p-5"> 
                     <div className='justify-content-center my-3'></div>
                        <div className="mb-4">
                          <label htmlFor="exampleInputEmail1" className="form-label fw-bold"><i className="fa-regular fa-face-smile fx-3 mx-2"></i>Name</label>
                          <h6 className='ps-5'>{user.name}</h6>
                        </div>
                        <div className="mb-4">
                          <label  className="form-label fw-bold"><i className="fa-regular fa-face-smile fx-3 mx-2"></i>Email</label>
                          <h6 className='ps-5'>{user.email}</h6>
                        </div>
                        <div className="mb-4">
                          <label  className="form-label fw-bold"><i className="fa-regular fa-face-smile fx-3 mx-2"></i>date</label>
                          <h6 className='ps-5'>{new Date(`${user.date}`).toLocaleString()}</h6>
                        </div>
                    </div>
                  </div>
            </div>
        </div>
      </div>
    </div>
  )
}
