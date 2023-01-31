import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentEdit() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    rollnumber: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleChange = (event) => {
    setStudent({...student, [event.target.name]: event.target.value});
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/students/${id}`)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/api/v1/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(student),
    })
    .then((response) => {
      if (response.ok) {
        navigate(`/students/index`);
        return response.json()
      }
    })
    .then((data) => console.log(data.message))
    .catch((error) => console.error(error));
  };

  return (
    <section className="m-5">
        <h3 className="m-5">Edit Student</h3>
        <form onSubmit={handleSubmit} className="m-5">
          <div className="form-group my-2">
            <label>Name:-</label>
            <input type="text" name="name" className="form-control" placeholder="Enter name" value={student.name} onChange={handleChange}/>
          </div>
          <div className="form-group my-2">
            <label>Email:-</label>
            <input type="text" name="email" className="form-control" placeholder="Enter email" value={student.email} onChange={handleChange}/>
          </div>
          <div className="form-group my-2">
            <label>Roll Number:-</label>
            <input type="text" name="rollnumber" className="form-control" placeholder="Enter Roll Number" value={student.rollnumber} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
      </section>
  );
};
