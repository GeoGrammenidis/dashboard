
export function fetchColors() {
    return fetch("https://reqres.in/api/products/").then(res=>res.json());
}
export function fetchUsers() {
    return fetch("https://reqres.in/api/users").then(res=>res.json());
}