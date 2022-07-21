import React, {useEffect, useState} from "react";
import {getProfile} from "../services/userService";
import {profileList} from "../utils/userSchema";

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
    const coverBackground = user.coverUrl ?
        {backgroundImage: 'url(' + user.coverUrl + ')'} :
        {backgroundColor: '#5fcf80'};
    const defaultAvatar = 'https://cdn-icons.flaticon.com/png/512/927/premium/927711.png?token=exp=1658338529~hmac=a01cf005f22ee323864103da98e86b4a';

    return (
        <React.Fragment>
            <section
                id='cover'
                style={coverBackground}
                className='d-flex justify-content-center align-items-center'
            >
                <div className='container position-relative' data-aos='zoom-in' data-aos-delay='100'>
                    <img src={user.avatarUrl || defaultAvatar} className='rounded-circle' width='100px' height='100px' alt='my avatar'></img>
                    <h1>{user.name}</h1>
                </div>
            </section>
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
                                <p>{user[i.label]? user[i.label] : 'Not set'}</p>
                            </div>
                        ))}
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary' type='submit'>
                            <i className="fa-solid fa-pen me-3" style={{color: 'white'}}></i>
                            Edit
                        </button>
                    </div>
                </div>
            </section>

        </React.Fragment>

    )
}

export default ProfileInfo;