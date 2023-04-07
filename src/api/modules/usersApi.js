import axios from "axios";

const usersApi = {

    //获取用户数据
    get(params) {
        return axios({
            url: "/users",
            method: "GET",
            params
        })
    },
    //获取特定用户的信息
    getById(params) {
        return axios({
            url: `/users/${params._id}`,
            method: "GET",
        })
    },
    //修改用户数据
    updateUser(data) {
        return axios({
            url: "/users",
            method: "PUT",
            data
        })
    },
    //删除用户数据
    deleteUser(data) {
        return axios({
            url: "/users",
            method: "DELETE",
            data
        })
    },
    login(data) {
        return axios({
            url: "/users/login",
            method: "POST",
            data
        })
    },
    getMenus() {
        return axios({
            url: "/users/getMenus",
            method: "GET",
        })
    },
    register(data) {
        return axios({
            url: "/users/register",
            method: "POST",
            data
        })
    }
}

export default usersApi