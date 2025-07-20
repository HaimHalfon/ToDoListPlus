import React, { useState } from "react";

function User({ user, handleClick, handleUpdate, handleDelete, bgColor, isAllTodosCompleted }) {
	// ----------------------------
	//  States
	// ----------------------------
	const [flagOtherData, setFlagOtherData] = useState(false);
	const [flagEdit, setFlagEdit] = useState(false);
	const [inputValues, setInputValues] = useState();

	// ----------------------------
	// Events
	// ----------------------------
	function onClick_card() {
		handleClick(user.id);
	}

	function onClick_otherData(e) {
		e.stopPropagation();
		setFlagOtherData(true);
	}

	function onClick_hideData(e) {
		e.stopPropagation();
		setFlagOtherData(false);
	}

	function onClick_edit(e) {
		e.stopPropagation();
		setInputValues(user);
		setFlagEdit(!flagEdit);
	}

	function onSubmit_form(e) {
		e.stopPropagation();
		e.preventDefault();
		handleUpdate(inputValues);
		setFlagEdit(false);
	}

	function onClick_delete(e) {
		e.stopPropagation();
		handleDelete(user.id);
	}

	function onChange_inputsForm(event) {
		let { name, value, type, checked } = event.target;
		if (name === "street" || name == "city" || name == "zipcode") {
			setInputValues({ ...inputValues, address: { ...inputValues.address, [name]: type === "number" ? +value : type === "checkbox" ? checked : value } });
		} else {
			setInputValues({ ...inputValues, [name]: type === "number" ? +value : type === "checkbox" ? checked : value });
		}
	}

	// ----------------------------
	// Render
	// ----------------------------
	return (
		<div className={"card card-clickable shadow mb-4 m-3 p-3 d-flex flex-row justify-content-between align-items-start " + bgColor} onClick={onClick_card}>
			<div className="card-text lh-base">
				<span
					title={isAllTodosCompleted ? "All todos are completed" : "You have incomplete todos"}
					className={(isAllTodosCompleted ? "bg-success" : "bg-danger") + " position-absolute top-0 start-0 translate-middle p-2 border border-light rounded-circle"}
				></span>
				<label className="text-body p-0">
					<b>ID: {user.id}</b>
				</label>
				<br />

				{!flagEdit ? (
					<>
						<b>Name: </b> {user.name} <br />
						<b>Email: </b> {user.email} <br />
						{!flagOtherData ? (
							<button className="btn btn-link btn-sm text-secondary p-0" onClick={(e) => onClick_otherData(e)}>
								Other Data
							</button>
						) : (
							<button className="btn btn-link btn-sm text-secondary p-0" onClick={(e) => onClick_hideData(e)}>
								Hide
							</button>
						)}
						{flagOtherData && (
							<div className="border-start border-5 mt-2 p-2 custom-animit-down">
								<b>Street: </b> {user.address?.street} <br />
								<b>City: </b> {user.address?.city} <br />
								<b>Zip Code: </b> {user.address?.zipcode} <br />
							</div>
						)}
					</>
				) : (
					<form onSubmit={onSubmit_form} className="custom-animit-down">
						<div className="input-group my-3">
							<span className="input-group-text fw-bold">Name:</span>
							<input className="form-control" type="text" name="name" value={inputValues.name} required onChange={onChange_inputsForm} />
						</div>

						<div className="input-group mb-3">
							<span className="input-group-text fw-bold">Email:</span>
							<input className="form-control" type="text" name="email" value={inputValues.email} required onChange={onChange_inputsForm} />
						</div>

						<div className="input-group mb-3">
							<span className="input-group-text fw-bold">Street:</span>
							<input className="form-control" type="text" name="street" value={inputValues.address?.street} onChange={onChange_inputsForm} />
						</div>

						<div className="input-group mb-3">
							<span className="input-group-text fw-bold">City:</span>
							<input className="form-control" type="text" name="city" value={inputValues.address?.city} onChange={onChange_inputsForm} />
						</div>

						<div className="input-group mb-3">
							<span className="input-group-text fw-bold">Zip Code:</span>
							<input className="form-control" type="text" name="zipcode" value={inputValues.address?.zipcode} onChange={onChange_inputsForm} />
						</div>

						<div className="mt-4 d-flex flex-row justify-content-between align-items-end">
							<button className="btn btn-primary me-3" type="submit">
								<i className="bi bi-check-lg text-reset"> Save</i>
							</button>
							<button className="btn btn-danger" type="button" onClick={(e) => onClick_delete(e)}>
								<i className="bi bi-trash text-reset py-3"></i>
							</button>
						</div>
					</form>
				)}
			</div>

			<div>
				<button className="btn btn-light btn-sm rounded-circle" onClick={(e) => onClick_edit(e)}>
					<i className={"bi " + (!flagEdit ? "bi-pencil-fill" : "bi-x")}></i>
				</button>
			</div>
		</div>
	);
}

export default User;
