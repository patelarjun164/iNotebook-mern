import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      //redirect
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    }
  }
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  return (
    <div className="container my-3">
      <h2>Signup to create account for iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" name="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} id="name" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" onChange={onChange} id="email" required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="exampleInputPassword1" name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" onChange={onChange} >Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name="cpassword" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
