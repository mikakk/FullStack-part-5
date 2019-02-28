import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
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
                error: "käyttäjätunnus tai salasana virheellinen"
            });
            setTimeout(() => {
                this.setState({ error: null });
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

    render() {
        const loginForm = () => (
            <div>
                <h2>Kirjaudu</h2>
                <form onSubmit={this.login}>
                    <div>
                        käyttäjätunnus
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleLoginFieldChange}
                        />
                    </div>
                    <div>
                        salasana
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleLoginFieldChange}
                        />
                    </div>
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        );

        const blogForm = () => (
            <div>
                <h2>Blogit</h2>
                <div id="user">
                    {this.state.user.name} logged in
                    <form onSubmit={this.logout}>
                        <button type="submit">logout</button>
                    </form>
                </div>
                <div id="blogs">
                    {this.state.blogs.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        );

        return <div>{this.state.user === null ? loginForm() : blogForm()}</div>;
    }
}

export default App;
