import React, { useState, useEffect } from "react";
import { fetchItems, getItemsByKey, addItem, updateItem, deleteItem } from "./utils.js";
import User from "./User.jsx";
import Todos from "./Todos.jsx";
import Posts from "./Posts.jsx";

// ----------------------------
// URLs
// ----------------------------
const URL_USERS = "https://jsonplaceholder.typicode.com/users";
const URL_TODOS = "https://jsonplaceholder.typicode.com/todos";
const URL_POSTS = "https://jsonplaceholder.typicode.com/posts";

function Users() {
	// ----------------------------
	//  States
	// ----------------------------
	const [users, setUsers] = useState([]);
	const [todos, setTodos] = useState([]);
	const [posts, setPosts] = useState([]);

	const [filteredUsers, setFilteredUsers] = useState([]);
	const [inputSearch, setInputSearch] = useState("");
	const [selectedUserId, setSelectedUserId] = useState(-1);
	const [flagAddUser, setFlagAddUser] = useState(false);
	const [inputNewUser, setInputNewUser] = useState({ name: "", email: "" });

	// ----------------------------
	// Data Fetching (Once)
	// ----------------------------
	useEffect(() => {
		fetchItems(URL_USERS).then(({ data }) => setUsers(data));
		fetchItems(URL_TODOS).then(({ data }) => setTodos(data));
		fetchItems(URL_POSTS).then(({ data }) => setPosts(data));
	}, []);

	// ----------------------------
	// Filter Users
	// ----------------------------
	useEffect(() => {
		setFilteredUsers(
			users.filter((user) => {
				return user.name.toLowerCase().includes(inputSearch.toLowerCase()) || user.email.toLowerCase().includes(inputSearch.toLowerCase());
			})
		);
	}, [inputSearch, users]);

	// ----------------------------
	// Helper Functions
	// ----------------------------
	function isAllTodosCompleted(userId) {
		const userTodos = getItemsByKey(todos, userId, "userId");
		return !userTodos.some((todo) => !todo.completed);
	}

	// ----------------------------
	// Events
	// ----------------------------
	function onChange_search(e) {
		setInputSearch(e.target.value);
		setSelectedUserId(-1);
	}

	function onClick_addUser() {
		setFlagAddUser(true);
		setSelectedUserId(-1);
	}

	function onChange_inputsForm(e) {
		const { name, value } = e.target;
		setInputNewUser({ ...inputNewUser, [name]: value });
	}

	function onSubmit_form(e) {
		e.preventDefault();
		setUsers(addItem(users, inputNewUser));
		setInputNewUser({ name: "", email: "" });
		setFlagAddUser(false);
	}

	function onClick_cancelForm() {
		setInputNewUser({ name: "", email: "" });
		setFlagAddUser(false);
	}

	// ----------------------------
	// Handlers
	// ----------------------------
	function handleClick_forUser(userId) {
		setSelectedUserId(selectedUserId === userId ? -1 : userId);
		setFlagAddUser(false);
	}

	function handleUpdate_forUser(updatedItem) {
		setUsers(updateItem(users, updatedItem));
	}

	function handleDelete_forUser(userId) {
		setUsers(deleteItem(users, userId));
	}

	function handleAdd_forTodo(newItem) {
		setTodos(addItem(todos, newItem));
	}

	function handleUpdate_forTodo(updatedItem) {
		setTodos(updateItem(todos, updatedItem));
	}

	function handleAdd_forPost(newItem) {
		setPosts(addItem(posts, newItem));
	}

	// ----------------------------
	// Render
	// ----------------------------
	return (
		<div className="d-flex flex-row align-items-start">
			<div className="card shadow custom-w-l">
				<div className="card-header py-4 d-flex flex-row justify-content-between align-items-center">
					<input type="text" className="form-control w-75" placeholder="Search..." onChange={onChange_search} />
					{!flagAddUser && (
						<button className="btn btn-secondary btn-sm rounded-circle" onClick={onClick_addUser}>
							<i className="bi bi-plus text-reset"></i>
						</button>
					)}
				</div>

				<ul className="m-3 p-0 overflow-y-scroll custom-h-xxl">
					{filteredUsers.map((user) => (
						<li key={user.id}>
							<User
								user={user}
								handleClick={handleClick_forUser}
								handleUpdate={handleUpdate_forUser}
								handleDelete={handleDelete_forUser}
								bgColor={selectedUserId === user.id ? "bg-body-secondary" : ""}
								isAllTodosCompleted={isAllTodosCompleted(user.id)}
							/>
						</li>
					))}
				</ul>
			</div>

			{selectedUserId != -1 && (
				<div className="ms-3 custom-animit-right custom-w-m">
					<Todos userId={selectedUserId} todos={getItemsByKey(todos, selectedUserId, "userId")} handleAdd={handleAdd_forTodo} handleUpdate={handleUpdate_forTodo} />
					<Posts userId={selectedUserId} posts={getItemsByKey(posts, selectedUserId, "userId")} handleAdd={handleAdd_forPost} />
				</div>
			)}

			{flagAddUser && (
				<div className="card shadow ms-3 custom-animit-right custom-w-m">
					<div className="card-header p-3">
						<h3 className="m-0">New User</h3>
					</div>

					<form onSubmit={onSubmit_form} className="m-3 custom-animit-down">
						<div className="input-group my-3">
							<span className="input-group-text fw-bold">Name:</span>
							<input className="form-control" type="text" name="name" required onChange={onChange_inputsForm} />
						</div>

						<div className="input-group mb-3">
							<span className="input-group-text fw-bold">Email:</span>
							<input className="form-control" type="text" name="email" required onChange={onChange_inputsForm} />
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
				</div>
			)}
		</div>
	);
}

export default Users;
