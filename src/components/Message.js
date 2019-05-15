import React from "react";

const Message = ({ type, message }) => {
    if (message === null) {
        return null;
    }
    const className = `message ${type}`;
    return <div className={className}>{message}</div>;
};

export default Message;
