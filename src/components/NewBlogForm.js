import React from "react";
const NewBlogForm = ({
    onSubmit,
    handleChange,
    newTitle,
    newAuthor,
    newUrl
}) => {
    return (
        <div>
            <h2>Create new Blog</h2>
            <form onSubmit={onSubmit}>
                <div>
                    Title
                    <input
                        name="newTitle"
                        value={newTitle}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    Author
                    <input
                        name="newAuthor"
                        value={newAuthor}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    Url
                    <input
                        name="newUrl"
                        value={newUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewBlogForm;
