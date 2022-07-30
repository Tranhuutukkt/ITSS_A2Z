import React, {useEffect, useState} from "react";
import moment from 'moment';
import {Link} from "react-router-dom";
import {getProfileById} from "../../services/userService";
import defaultImage from '../../utils/logo512.png';

function PostItem({post}) {
    return (
        <React.Fragment>
            <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4">
                <div className="post-item">
                    {(post.mediaUrl.length !== 0) && (<img src={post.mediaUrl[0]} className='img-fluid' alt="media"/>)}
                    <div className="post-content">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4></h4>
                            <p className="time">{moment(post.createAt).format('HH:mm DD-MM-YYYY')}</p>
                            {}
                        </div>

                        <h3><Link to={'/posts/' + post._id}>{post.header}</Link></h3>
                        <p>{post.text}</p>
                        <div className="user d-flex justify-content-between align-items-center">
                            <div className="user-profile d-flex align-items-center">
                                <img src={post.avatarUrl || defaultImage} className="img-fluid" alt="User Avatar"/>
                                <span>{post.name}</span>
                            </div>
                            <div className="user-rank d-flex align-items-center">
                                <i className="fa-solid fa-message"></i>&nbsp;0
                                &nbsp;&nbsp;
                                <i className="fa-solid fa-star"></i>&nbsp;0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PostItem;