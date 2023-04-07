import axios from "axios";

const classesApi = {
    //根据专业id获取对应的班级数据
    getByMid(params) {
        return axios({
            url: "/classes/getByMid",
            method: "GET",
            params
        })
    },
}
//将classesApi这个const变量暴露出去,使得其他文件也能使用该变量
export default classesApi;