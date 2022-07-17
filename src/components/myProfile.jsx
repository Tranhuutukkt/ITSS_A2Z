import React from "react";
import {getCurrentUser} from "../services/authService";
import MyTab from "./myTab";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileInfo from "./profileInfo";
import Posts from "./posts";

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
            <main>
                {user && (
                    <div className='profile-tabs'>
                        <MyTab
                            tabList={user.role === 'teacher' ?
                                tabList.filter(t => t.label !== 'comment') :
                                tabList.filter(t => t.label !== 'answer')}
                        />
                    </div>
                )}
                <Switch>
                    <Route path='/me/profile' exact component={ProfileInfo}/>
                    <Route path='/me/posts' exact component={Posts}/>
                    {/*<Redirect to='/me/profile'/>*/}
                </Switch>
            </main>
        </React.Fragment>

    );
}

export default MyProfile;