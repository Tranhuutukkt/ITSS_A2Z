import React from "react";


function Search ({query, onchange}) {

    return (
        <div className='block'>
            <input
                className='form-control search'
                type="text"
                placeholder="Search ..."
                value={query}
                onChange={e => onchange(e.currentTarget.value)}
            />
        </div>
    );
}

export default Search;