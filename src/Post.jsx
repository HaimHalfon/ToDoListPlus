import React from "react";

function Post({ post }) {
	// ----------------------------
	// Render
	// ----------------------------
	return (
		<div className="border-bottom me-3 p-2">
			<div className="card-text lh-base me-3">
				<b>Title:</b> {post.title} <br />
				<b>Body:</b> {post.body} <br />
			</div>
		</div>
	);
}

export default Post;
