import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class loginService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);

    }

    
    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }
    

    /*
    createUser(user) {
        return axios.post(USER_API_BASE_URL, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    */

    getUserById(userId){
        return axios.get(USER_API_BASE_URL +'/' + userId);

    }

    updateUser(user){
        return axios.put(USER_API_BASE_URL +'/' + user.id, user);

    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL +'/' + userId);

    }

}
export default new loginService()

