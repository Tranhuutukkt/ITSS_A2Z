import http from "./httpService";
import {getCurrentUser, getJwt} from "./authService";

const apiEndpoint = '/users'

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        role: user.role,
        name: user.name
    });
}

export function profileEdit(user) {
    return http.put(apiEndpoint + '/me', user);
}

export async function getProfile(){
    const {data} = await http.get(apiEndpoint + '/me', {
        headers: {'x-auth-token': getJwt()}
    });
    return data;
}