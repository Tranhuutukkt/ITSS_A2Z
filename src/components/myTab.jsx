import React from "react";
import {Link} from "react-router-dom";

function MyTab({tabList}) {
    //eg. tabList = [{label: 'home', title: 'Home'}]
    const key = tabList[0].label;

    return (
        <React.Fragment>
            <ul className="nav nav-tabs nav-justified">
                {tabList.map(t => (
                    <li className="nav-item" key={t.label}>
                        <Link
                            className={key === t.label ? "nav-link active show": "nav-link"}
                            aria-current="page"
                            to={'/me/' + t.label}
                        >{t.title}</Link>
                    </li>
                ))}
            </ul>
        </React.Fragment>

    );
}

export default MyTab;