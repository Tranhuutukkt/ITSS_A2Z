import React from "react";
import defaultImage from '../../utils/logo512.png';

function ProfileImage({user}) {
    const coverBackground = user.coverUrl ?
        {backgroundImage: 'url(' + user.coverUrl + ')'} :
        {backgroundColor: '#5fcf80'};

    return (
        <section
            id='cover'
            style={coverBackground}
            className='d-flex justify-content-center align-items-center'
        >
            <div className='container position-relative' data-aos='zoom-in' data-aos-delyay='100'>
                <img src={user.avatarUrl || defaultImage} className='rounded-circle' width='100px' height='100px' alt='my avatar'></img>
                <h1>{user.name}</h1>
            </div>
        </section>
    );
}

export default ProfileImage;