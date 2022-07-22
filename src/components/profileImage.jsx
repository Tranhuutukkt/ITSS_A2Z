import React from "react";

function ProfileImage({user}) {
    const coverBackground = user.coverUrl ?
        {backgroundImage: 'url(' + user.coverUrl + ')'} :
        {backgroundColor: '#5fcf80'};
    const defaultAvatar = 'https://a2zitss.blob.core.windows.net/tutorial-container/Avatar.png';

    return (
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
    );
}

export default ProfileImage;