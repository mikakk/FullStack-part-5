import React from "react";
class TogglableBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible });
    };

    render() {
        const blog = {
            padding: 10,
            border: "solid",
            borderWidth: 1,
            marginBottom: 5
        };

        const showWhenVisible = { display: this.state.visible ? "" : "none" };

        return (
            <div style={blog} onClick={() => this.toggleVisibility()}>
                <div>
                    {this.props.blog.title}: {this.props.blog.author}
                </div>
                <div style={showWhenVisible}>{this.props.children}</div>
            </div>
        );
    }
}

export default TogglableBlog;
