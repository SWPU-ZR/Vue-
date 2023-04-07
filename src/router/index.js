import Vue from 'vue'
import VueRouter from 'vue-router'
//按需引入element组件
import { MessageBox } from "element-ui"
//引入api
import api from '@/api'
//引入仓库
import store from '@/store'
import LoginView from "../views/login/LoginView.vue"
import HomeView from "../views/home/HomeView.vue"
import StudentsList from "../views/home/students/StudentsList.vue"
import StudentsAdd from "../views/home/students/StudentsAdd.vue"
import Charts from "../views/home/Charts.vue"
import MajorsList from "../views/home/majors/MajorsList.vue"
import StudentsUpdate from "../views/home/students/StudentsUpdate.vue"
import UsersList from '@/views/home/users/UsersList.vue'
import UsersUpdate from "@/views/home/users/UsersUpdate.vue"
//只有一些使用频率低，代码结构简单的路由才可以使用懒加载
const RegisterView = () => import("../views/register/RegisterView.vue")
const NotFound = () => import("@/views/404/NotFound.vue")

Vue.use(VueRouter)

//配置项目中所有中需要切换的组件和路径
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    name: "Login",
    path: "/login",
    component: LoginView
  },
  {
    name: "Register",
    path: "/register",
    component: RegisterView
  },
  {
    path: "/home",
    component: HomeView,
    children: [
      {
        //默认子路由
        path: "",
        name: "Home",
        component: Charts
      }
      ,
      {
        //子路由的path不能以/开头
        path: "studentsList",
        name: "StudentsList",
        component: StudentsList,
        //路由元信息可以用于面包屑的信息展示
        meta: {
          title: ["首页", "学生管理", "学生列表"]
        }
      },
      {
        path: "studentsAdd",
        name: "StudentsAdd",
        component: StudentsAdd,
        meta: {
          title: ["首页", "学生管理", "新增学生"],
          //用于路由缓存
          keepAlive: true
        }
      },
      {
        path: "majorsList",
        name: "MajorsList",
        component: MajorsList,
        meta: {
          title: ["首页", "专业管理", "专业列表"]
        }
      },
      {
        path: "usersList",
        name: "UsersList",
        component: UsersList,
        meta: {
          title: ["首页", "用户管理", "用户列表"]
        }
      },
      //动态路由的配置
      {
        path: "usersUpdate/:_id",
        name: "UsersUpdate",
        component: UsersUpdate,
        meta: {
          title: ["首页", "用户管理", "修改用户"]
        }
      },
      //动态路由的配置
      {
        path: "studentsUpdate/:_id",
        name: "StudentsUpdate",
        component: StudentsUpdate,
        meta: {
          title: ["首页", "学生管理", "修改学生"]
        }
      },
      //404路由必须放在最后，用于匹配所有的路径
      {
        path: "*",
        name: "NotFound",
        component: NotFound
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//全局守卫
router.beforeEach(async (to, from, next) => {
  //判断路由是否包含/home
  if (to.path.includes("/home")) {
    //获取本地存储里的user_token
    const token = localStorage.user_token
    if (token) {
      //登录成功，将token发回给后端判断用户角色获取相应的菜单数据(token添加到请求头)
     const res=await api.users.getMenus()
     if(res.code){
      //将数据保存到vuex
      store.commit("SET_MENUS",res.data)
      
     }
      next()
    } else {
      MessageBox.alert('您还未登陆，请先登录！', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          next("/login")//登录失败后跳转到登录页面
        }
      });
    }
  } else {
    next()
  }
})

export default router
