import React from "react";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Message from "./components/Message";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            messageType: "",
            message: null,
            newTitle: "",
            newAuthor: "",
            newUrl: "",
            loginVisible: null,
            username: "",
            password: "",
            user: null
        };
    }

    componentDidMount() {
        blogService.getAll().then(blogs => this.setState({ blogs }));

        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            this.setState({ user });
            blogService.setToken(user.token);
        }
    }

    login = async event => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            });

            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            this.setState({ username: "", password: "", user });
        } catch (exception) {
            this.setState({
                messageType: "error",
                message: "Username or password invalid"
            });
            setTimeout(() => {
                this.setState({ message: null });
            }, 5000);
        }
    };

    logout = async event => {
        event.preventDefault();
        window.localStorage.removeItem("loggedBlogappUser");
        blogService.setToken(null);
        this.setState({ user: null });
    };

    handleLoginFieldChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    addBlog = event => {
        event.preventDefault();
        const blogObject = {
            title: this.state.newTitle,
            author: this.state.newAuthor,
            url: this.state.newUrl
        };

        blogService.create(blogObject).then(newBlog => {
            this.setState({
                blogs: this.state.blogs.concat(newBlog),
                newTitle: "",
                newAuthor: "",
                newUrl: "",
                messageType: "success",
                message: "Blog added: " + newBlog.title + " " + newBlog.author
            });
            setTimeout(() => {
                this.setState({ message: null });
            }, 5000);
        });
        this.blogForm.toggleVisibility();
    };

    handleBlogChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const loginForm = () => (
            <Togglable buttonLabel="Login">
                <LoginForm
                    username={this.state.username}
                    password={this.state.password}
                    handleChange={this.handleLoginFieldChange}
                    handleSubmit={this.login}
                />
            </Togglable>
        );

        const userForm = () => (
            <div id="user">
                {this.state.user.name} logged in
                <form onSubmit={this.logout}>
                    <button type="submit">Logout</button>
                </form>
            </div>
        );

        const newBlogForm = () => (
            <Togglable
                buttonLabel="New Blog"
                ref={component => (this.blogForm = component)}
            >
                <BlogForm
                    newTitle={this.state.newTitle}
                    newAuthor={this.state.newAuthor}
                    newUrl={this.state.newUrl}
                    handleChange={this.handleBlogChange}
                    onSubmit={this.addBlog}
                />
            </Togglable>
        );

        const blogsForm = () => (
            <div id="blogs">
                <h2>Blogs</h2>
                {this.state.blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        );

        return (
            <div>
                <Message
                    type={this.state.messageType}
                    message={this.state.message}
                />
                {this.state.user === null ? (
                    loginForm()
                ) : (
                    <div>
                        {userForm()}
                        {newBlogForm()}
                        {blogsForm()}
                    </div>
                )}
            </div>
        );
    }
}

export default App;
