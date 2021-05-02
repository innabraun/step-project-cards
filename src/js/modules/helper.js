export const isTokenInLocalStorage=()=>{
    const token=localStorage.getItem("token")
    return token !== null && token !== undefined && token !== ""
}