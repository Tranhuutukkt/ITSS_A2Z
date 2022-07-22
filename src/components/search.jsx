import React from "react";


function Search ({query, onchange}) {

    return (
        <div className='block control'>
            <input className="input is-primary"
                   type="text"
                   placeholder="Search…"
                   value={query}
                   onChange={e => onchange(e.currentTarget.value)}
            />
        </div>
    );
}

export default Search;