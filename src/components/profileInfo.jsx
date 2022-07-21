import React, {useEffect, useState} from "react";
import {getProfile} from "../services/userService";
import {profileList} from "../utils/userSchema";
import {Link} from "react-router-dom";
import ProfileImage from "./profileImage";

function ProfileInfo() {
    const [user, setUser] =  useState({});

    useEffect(() => {
        const getData = async () => {
            const userInfo = await getProfile();
            setUser(userInfo);
        };
        getData().catch(console.error);

    }, []);

    const infoList = profileList;

    return (
        <React.Fragment>
            <ProfileImage user={user}/>
            <section id='profile-info' className='profile-info'>
                <div data-aos='fade-up' className='container'>
                    <div className='row'>
                        {infoList.map(i => (
                            <div
                                className="info col-lg-6 col-md-6 mt-4"
                                key={i.label}
                            >
                                <i className={i.icon}></i>
                                <h4>{i.name}</h4>
                                {i.label === 'gender' ?
                                    <p>{user[i.label] ? 'Male' : 'Female'}</p> :
                                    <p>{user[i.label] ? user[i.label] : 'Not set'}</p>
                                }
                            </div>
                        ))}
                    </div>
                    <Link to='/me/profile/edit'>
                        <button className='btn btn-primary'>
                            <i className="fa-solid fa-pen me-3" style={{color: 'white'}}></i>
                            Edit
                        </button>
                    </Link>
                </div>
            </section>

        </React.Fragment>

    )
}

export default ProfileInfo;