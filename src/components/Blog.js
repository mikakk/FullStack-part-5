import React from "react";
const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        marginBottom: 5
    };

    return (
        <div className="all-info" key={blog.id} style={blogStyle}>
            <div className="title">{blog.title}</div>
            <div className="author">{blog.author}</div>
            <div className="url">
                <a href={`${blog.url}`}>{blog.url}</a>
            </div>
            <div>{blog.likes} likes</div>
        </div>
    );
};

export default Blog;
