import React from "react";
import Form from "../common/form";
import {postSchema} from "../../utils/userSchema";
import {createPost} from "../../services/postService";
import {getProfile} from "../../services/userService";

class CreatePost extends Form {
    state = {
        data: {header: '', text: '', userId: '', mediaUrl: []},
        errors: {}
    }

    async componentDidMount() {
        const user = await getProfile();
        const newPost = {...this.state.data};
        newPost.userId = user._id;
        this.setState({ data: newPost});
    }

    schema = postSchema;

    doSubmit = async () => {
            await createPost(this.state.data);
            window.location = '/';
    }

    render(){

        return(
            <div className='col-lg-6 col-md-6 d-flex align-items-stretch mt-4'>
                <div className="post-item form-block ">
                    <form className="post-content form" onSubmit={this.handleSubmit}>
                        {this.renderInput('header', 'Header')}
                        {this.renderInput('text', 'Your post')}
                        {this.renderButton('Create')}
                    </form>
                </div>
            </div>
        )
    }
}

export default CreatePost;