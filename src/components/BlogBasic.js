import React from "react";
const BlogBasic = ({ blog }) => (
    <div key={blog.id}>
        {blog.title} {blog.author} {blog.url}
    </div>
);

export default BlogBasic;
