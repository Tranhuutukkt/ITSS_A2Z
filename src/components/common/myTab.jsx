import React from "react";
import {NavLink} from "react-router-dom";

function MyTab({tabList}) {
    //eg. tabList = [{label: 'home', title: 'Home'}]

    return (
        <React.Fragment>
            <ul className="nav nav-tabs nav-justified">
                {tabList.map(t => (
                    <li className="nav-item" key={t.label}>
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to={'/me/' + t.label}
                        >{t.title}</NavLink>
                    </li>
                ))}
            </ul>
        </React.Fragment>

    );
}

export default MyTab;