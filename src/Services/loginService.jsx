import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/checkUsername";
const USER_LOGIN_API_BASE_URL = "http://localhost:8080/api/v1/Login";
const USER_LOGIN_API_BASE_URL_logindetails = "http://localhost:8080/api/v1/LoginDetails";

class loginService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);

    }

    getUserRole(){
        return axios.get(USER_API_BASE_URL);

    }

    
    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    
    
    createUserLogin(user){
        return axios.post(USER_LOGIN_API_BASE_URL, user);
    }


    getUserById(userId){
        return axios.get(USER_API_BASE_URL +'/' + userId);

    }
    

    getUserByUserName(username){
        return axios.get(USER_API_BASE_URL +'/' + username);

    }

    updateUser(user){
        return axios.put(USER_API_BASE_URL +'/' + user.id, user);

    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL +'/' + userId);

    }

}
export default new loginService()

