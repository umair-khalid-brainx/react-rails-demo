import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function StudentForm(props) {
	const [formData, setFormData] = useState({
		name: props.student.name || "",
		email: props.student.email || "",
		rollnumber: props.student.rollnumber || "",
	});

	const schema = yup.object().shape({
		name: yup.string("Name must be a string").required("Name is required"),
		email: yup.string("Email must be a string").email("Email must match an email format").required("Email is required"),
		rollnumber: yup
			.number("Roll number must be a number")
			.min(18001, "Roll number must be between 18001 and 18099")
			.max(18099, "Roll number must be between 18001 and 18099")
			.required("Roll number is required"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const formSubmit = (data) => {
		props.handleSubmitPassed(data);
	};

	return (
		<section className='m-5'>
			<h3 className='m-5'>Student Form</h3>
			<form onSubmit={handleSubmit(formSubmit)} className='m-5'>
				<div className='form-group my-2'>
					<label>Name:-</label>
					<input
						type='text'
						name='name'
						className='form-control'
						placeholder='Enter name'
						{...register("name")}
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
					/>
					<p className='text-danger fst-italic'>
						<small>{errors.name?.message}</small>
					</p>
				</div>
				<div className='form-group my-2'>
					<label>Email:-</label>
					<input
						type='text'
						name='email'
						className='form-control'
						placeholder='Enter email'
						{...register("email")}
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
					/>
					<p className='text-danger fst-italic'>
						<small>{errors.email?.message}</small>
					</p>
				</div>
				<div className='form-group my-2'>
					<label>Roll Number:-</label>
					<input
						type='number'
						name='rollnumber'
						className='form-control'
						placeholder='Enter Roll Number'
						{...register("rollnumber")}
						value={formData.rollnumber}
						onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
					/>
					<p className='text-danger fst-italic'>
						<small>{errors.rollnumber?.message}</small>
					</p>
				</div>
				<button type='submit' className='btn btn-primary my-2'>
					Submit
				</button>
			</form>
		</section>
	);
}
