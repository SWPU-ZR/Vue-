import axios from "axios";

const studentsApi = {
    //获取学生数据
    get(params) {
        return axios({
            url: "/students",
            method: "GET",//GET可以不写，默认请求方式是GET
            params//当请求类型为GET时，只能用params传递参数
        })
    },
    //获取特定学生的信息
    getById(params) {
        return axios({
            url: `/students/${params._id}`,
            method: "GET",        
        })
    },
    //修改学生信息
    updateStudent(data){
        return axios({
            url:"/students",
            method:"PUT",
            data
        })
    },
    //删除学生数据
    delete(data) {
        return axios({
            url: "/students",
            method: "DELETE",
            //通过data对象发送请求参数，可以触发简写
            data
        })
    },
    //新增学生数据
    add(data) {
        return axios({
            url: "/students",
            method: "POST",
            data
        })
    }
}
//将studentsApi这个const变量暴露出去,使得其他文件也能使用该变量
export default studentsApi;