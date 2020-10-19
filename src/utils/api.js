export function fetching(x) {
    return fetch(`https://reqres.in/api/${x}/`).then(res=>res.json());
}