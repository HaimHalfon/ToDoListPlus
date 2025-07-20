import React from "react";

function Todo({ todo, handleUpdate }) {
	// ----------------------------
	// Events
	// ----------------------------
	function onClick_doneTodo() {
		handleUpdate({ ...todo, completed: true });
	}

	// ----------------------------
	// Render
	// ----------------------------
	return (
		<div className="border-bottom me-3 p-2 d-flex flex-row justify-content-between align-items-center">
			<div className="card-text lh-base me-3">
				<b>Title:</b> {todo.title} <br />
				<b>Completed:</b> <span className={todo.completed ? "text-success" : "text-danger"}>{todo.completed ? "Yes" : "No"}</span> <br />
			</div>
			{!todo.completed && (
				<button className="btn btn-success btn-sm" onClick={onClick_doneTodo}>
					Done
				</button>
			)}
		</div>
	);
}

export default Todo;
