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
    }

    login = async event => {
        event.preventDefault();
        console.log(
            "logging in with",
            this.state.username,
            this.state.password
        );
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            });

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
                <p>{this.state.user.name} logged in</p>
                {this.state.blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        );

        return (
            <div>
                {this.state.user === null ? (
                    loginForm()
                ) : (
                    <div>{blogForm()}</div>
                )}
            </div>
        );
    }
}

export default App;
