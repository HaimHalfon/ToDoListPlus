import React, { useState, useEffect } from "react";
import Todo from "./Todo.jsx";

function Todos({ userId, todos, handleAdd, handleUpdate }) {
	// ----------------------------
	//  States
	// ----------------------------
	const [flagAddTodo, setFlagAddTodo] = useState(false);
	const [inputNewTodo, setInputNewTodo] = useState({ title: "" });

	// ----------------------------
	//  Update flagAddTodo - when userId changed
	// ----------------------------
	useEffect(() => {
		setFlagAddTodo(false);
	}, [userId]);

	// ----------------------------
	// Events
	// ----------------------------
	function onClick_addTodo() {
		setFlagAddTodo(true);
	}

	function onChange_inputsForm(e) {
		const { name, value } = e.target;
		setInputNewTodo({ ...inputNewTodo, [name]: value });
	}

	function onSubmit_form(e) {
		e.preventDefault();
		handleAdd({ userId: userId, ...inputNewTodo, completed: false });
		setInputNewTodo({ title: "" });
		setFlagAddTodo(false);
	}

	function onClick_cancelForm() {
		setInputNewTodo({ title: "" });
		setFlagAddTodo(false);
	}

	// ----------------------------
	// Render
	// ----------------------------
	return (
		<div className="card shadow mb-3">
			<div className="card-header p-3 d-flex flex-row justify-content-between align-items-center">
				<h4 className="m-0">
					{!flagAddTodo ? "Todos" : "New Todo"} - User {userId}
				</h4>
				{!flagAddTodo && (
					<button className="btn btn-secondary btn-sm rounded-circle" onClick={onClick_addTodo}>
						<i className="bi bi-plus text-reset"></i>
					</button>
				)}
			</div>

			{!flagAddTodo ? (
				<ul className="m-3 p-0 overflow-y-scroll custom-h-xs">
					{todos.map((todo) => (
						<li key={todo.id}>
							<Todo todo={todo} handleUpdate={handleUpdate} />
						</li>
					))}
				</ul>
			) : (
				<form onSubmit={onSubmit_form} className="m-3 custom-animit-down">
					<div className="input-group my-3">
						<span className="input-group-text fw-bold">Title:</span>
						<input className="form-control" type="text" name="title" required onChange={onChange_inputsForm} />
					</div>

					<div className="d-flex flex-row mt-4">
						<button className="btn btn-primary me-3" type="submit">
							Add
						</button>
						<button className="btn btn-light" type="button" onClick={onClick_cancelForm}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default Todos;
