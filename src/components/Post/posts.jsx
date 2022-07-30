import React, {useState, useEffect} from "react";
import Search from "../common/search";
import {getAllPost} from "../../services/postService";
import PostItem from "./postItem";
import CreatePost from "./createPost";
import {getProfileById} from "../../services/userService";

function Posts({user}) {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPostData = async () => {

            const data = await getAllPost();
            const newPost = await Promise.all(
                 data.map(async p => {
                    const user =  await getProfileById(p.userId);
                    p.name = user.name;
                    p.avatarUrl = user.avatarUrl;
                    return p;
                }));
            setPosts(newPost);
        };
        getPostData().catch(console.error);

    }, []);

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
            <section id="posts" className="posts">
                <div className="container" data-aos="fade-up">
                    <div className="row" data-aos="zoom-in" data-aos-delay="100">
                        <Search onchange={handleSearch}/>
                        <CreatePost/>
                        {displayPost.map(p => (
                                <PostItem post={p} key={p._id}/>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Posts;