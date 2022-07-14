import React from "react";
import {getCurrentUser} from "../services/authService";
import MyTab from "./myTab";
import {Route, Switch} from "react-router-dom";
import ProfileInfo from "./profileInfo";

function MyProfile({user}) {
    const tabList = [
        {label: 'profile', title: 'Profile'},
        {label: 'posts', title: 'My Posts'},
        {label: 'comment', title: 'My Comment'},
        {label: 'answer', title: 'My Answer'},
        {label: 'notify', title: 'Notify'}
    ];

    return (
        <React.Fragment>
            {user && (
                <div className='profile-tabs'>
                    <MyTab
                        tabList={user.role === 'teacher' ?
                            tabList.filter(t => t.label !== 'comment') :
                            tabList.filter(t => t.label !== 'answer')}
                    />
                </div>
            )}
            <main>
                <Switch>
                    <Route path='/me/profile' exact component={ProfileInfo}/>
                </Switch>
            </main>
        </React.Fragment>

    );
}

export default MyProfile;