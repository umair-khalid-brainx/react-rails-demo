import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function StudentList() {
	const [students, setStudents] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:5000/api/v1/students")
			.then((response) => response.json())
			.then((data) => setStudents(data))
			.catch((error) => console.log(error));
	}, []);

	function handleDelete(id) {
		fetch(`http://localhost:5000/api/v1/students/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
		.then((response) => response.json())
		.then((data) => { setStudents(students.filter((student) => student.id !== id));})
		.catch((error) => console.log(error));
	}

	const handleShow = (id) => {
		navigate(`/students/${id}/show`);
	};

	const handleCreate = () => {
		navigate(`/students/create`);
	};

	const handleEdit = (id) => {
		navigate(`/students/${id}/edit`);
	};

	return (
		<section className='m-5'>
			<h1 className='h1 text-center'>Student Info</h1>
			<h3>Student Index</h3>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Email</th>
						<th scope='col'>Roll Number</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr key={student.id}>
							<th scope='row'>{student.id}</th>
							<td className="fw-bold">{student.name}</td>
							<td>{student.email}</td>
							<td>{student.rollnumber}</td>
							<td>
								<button className='btn btn-primary mx-2' onClick={() => handleShow(student.id)}>Show</button>
								<button className='btn btn-success mx-2' onClick={() => handleEdit(student.id)}>Edit</button>
								<button className='btn btn-danger mx-2' onClick={() => handleDelete(student.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className='btn btn-dark' onClick={() => handleCreate()}>Create New Student</button>
		</section>
	);
}
