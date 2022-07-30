import http from "./httpService";
import {getJwt} from "./authService";

const apiEndpoint = '/posts';

export async function getAllPost(){
    const {data} = await http.get(apiEndpoint);
    return data;
}

export async function getPostWithId(postId){
    const {data} = await http.get(
        apiEndpoint + '/' + postId,
        {params: postId});
    return data;
}

export function createPost(post) {
    return http.post(apiEndpoint,{
        header: post.header,
        text: post.text,
        userId: post.userId,
        mediaUrl: post.mediaUrl.map(m => m),
        },
        {headers: {'x-auth-token': getJwt()}}
    );
}

export function postEdit(post) {
    return http.put(apiEndpoint + '/' + post.id, post);
}

export function postDelete(postId) {
    return http.delete(
        apiEndpoint + '/' + postId,
        {params: postId});
}