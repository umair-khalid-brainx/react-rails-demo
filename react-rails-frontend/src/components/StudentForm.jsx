import React, { useState } from 'react';

export default function StudentForm({student, handleSubmit}) {
  const [formData, setFormData] = useState(student);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
      <section>
        <h3>Add New Student</h3>
        <form onSubmit={(event) => handleSubmit(event, formData)}>
          <div className="form-group my-2">
            <label>Name:-</label>
            <input type="text" name="name" className="form-control" placeholder="Enter name" value={formData.name} onChange={handleChange}/>
          </div>
          <div className="form-group my-2">
            <label>Email:-</label>
            <input type="text" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
          </div>
          <div className="form-group my-2">
            <label>Roll Number:-</label>
            <input type="text" name="rollnumber" className="form-control" placeholder="Enter Roll Number" value={formData.rollnumber} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
      </section>
  );
}
