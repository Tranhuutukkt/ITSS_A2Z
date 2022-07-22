import React, {useState} from "react";
import CreatePost from "./createPost";
import Search from "./search";

function Posts({user}) {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState('');

    const handleSearch = query =>{
        setQuery(query);
    };

    const getData = () => {
        let postList = posts;
        if (query)
            postList = posts.filter(
                p => p.text.toLowerCase().match(query.toLowerCase())
            );
        return {displayPost: postList}
    }

    const {displayPost} = getData();

    return(
        <React.Fragment>
            <Search />
            <CreatePost user={user}/>
        </React.Fragment>
    );
}

export default Posts;