import React, { useState, useEffect } from "react";
import Post from "./Post.jsx";

function Posts({ userId, posts, handleAdd }) {
	// ----------------------------
	//  States
	// ----------------------------
	const [flagAddPost, setFlagAddPost] = useState(false);
	const [inputNewPost, setInputNewPost] = useState({ title: "", body: "" });

	// ----------------------------
	//  Update flagAddPost - when userId changed
	// ----------------------------
	useEffect(() => {
		setFlagAddPost(false);
	}, [userId]);

	// ----------------------------
	// Events
	// ----------------------------
	function onClick_addPost() {
		setFlagAddPost(true);
	}

	function onChange_inputsForm(e) {
		const { name, value } = e.target;
		setInputNewPost({ ...inputNewPost, [name]: value });
	}

	function onSubmit_form(e) {
		e.preventDefault();
		handleAdd({ userId: userId, ...inputNewPost });
		setInputNewPost({ title: "", body: "" });
		setFlagAddPost(false);
	}

	function onClick_cancelForm() {
		setInputNewPost({ title: "", body: "" });
		setFlagAddPost(false);
	}

	// ----------------------------
	// Render
	// ----------------------------
	return (
		<div className="card shadow mb-3">
			<div className="card-header p-3 d-flex flex-row justify-content-between align-items-center">
				<h4 className="m-0">
					{!flagAddPost ? "Posts" : "New Post"} - User {userId}
				</h4>
				{!flagAddPost && (
					<button className="btn btn-secondary btn-sm rounded-circle" onClick={onClick_addPost}>
						<i className="bi bi-plus text-reset"></i>
					</button>
				)}
			</div>

			{!flagAddPost ? (
				<ul className="m-3 p-0 overflow-y-scroll custom-h-xs">
					{posts.map((post) => (
						<li key={post.id}>
							<Post post={post} />
						</li>
					))}
				</ul>
			) : (
				<form onSubmit={onSubmit_form} className="m-3 custom-animit-down">
					<div className="input-group my-3">
						<span className="input-group-text fw-bold">Title:</span>
						<input className="form-control" type="text" name="title" required onChange={onChange_inputsForm} />
					</div>

					<div className="input-group mb-3">
						<span className="input-group-text fw-bold">Body:</span>
						<input className="form-control" type="text" name="body" required onChange={onChange_inputsForm} />
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

export default Posts;
