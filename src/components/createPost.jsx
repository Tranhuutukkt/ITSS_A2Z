import React from "react";

function CreatePost({user}) {
    return(
        <React.Fragment>
            <label htmlFor={user.name}>{user.name}</label>
            <textarea rows='5' cols='55' name='posts' defaultValue='Create your post...'/>
        </React.Fragment>

    );
}

export default CreatePost;