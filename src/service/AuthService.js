
export const AuthService = () => {

}

export const storeTokenInLS = (token) => {
  localStorage.setItem("user_token", token);
  
}