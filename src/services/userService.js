import http from "./httpService";

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

export function getProfile(){
    return http.get(apiEndpoint + '/me');
}