import axios from "axios";

const majorsApi = {
    //获取专业数据
    get(params) {
        return axios({
            url: "/majors",
            method: "GET",
            params
        })
    },
    //删除专业数据
    delete(data) {
        return axios({
            url: "/majors",
            method: "DELETE",
            data
        })
    },
    //修改专业数据
    update(data) {
        return axios({
            url: "/majors",
            method: "PUT",
            data
        })
    }
}
//将majorsApi这个const变量暴露出去,使得其他文件也能使用该变量
export default majorsApi;