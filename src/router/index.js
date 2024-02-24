import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path:'/',
        name:'main',
        component:()=>import('../pages/Web/Main/Main.vue')
      },
      {
        path:'/login',
        name:'login',
        component:()=>import('../pages/Web/Auth/Login.vue')
      },
      {
        path:'/news-detail/:id',
        component:()=>import('../pages/Web/News/NewsDetail.vue')
      },
      {
        path:'account',
        name:'account',
        component:()=>import('../pages/Web/Account/AccoutView.vue')
      },
      {
        path:'post-view',
        name:'post-view',
        component:()=>import('../pages/Web/Post/PostVIew.vue')
      },
      {
        path:'post-list',
        name:'post-list',
        component:()=>import('../pages/Web/Post/PostList.vue')
      },
      {
        path:'post-detail/:id',
        name:'post-detail',
        component:()=>import('../pages/Web/Post/PostDetail.vue')
      }
    ]
  },
  {
    path:'/admin',
    name:'admin',
    redirect: "/admin/dashboard",
    component:()=>import ('../views/AdminView.vue'),
    meta: { requiresAuth: true },
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:()=>import ('../pages/Admin/Dashboard/Dashboard.vue'),
      },
      {
        path:'department',
        name:'department',
        component:()=>import ('../pages/Admin/Department/Department.vue')
      },
      {
        path:'news',
        name:'news',
        component:()=>import ('../pages/Admin/News/News.vue'),
      },
      {
        path:'newsbyid/:id',
        name:'newsbyid',
        component:()=>import('../pages/Admin/News/NewsById.vue')
      },
      {
        path:'newsdetail/:id',
        name:'newsdetail',
        component:()=>import('../pages/Admin/News/NewsDetail.vue')
      },
      {
        path:'user',
        name:'user',
        component:()=>import('../pages/Admin/User/UserView.vue')
      },
      {
        path:'post',
        name:'post',
        component:()=>import('../pages/Admin/Post/Post.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("role")==='true'
console.log(isAuthenticated);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "main" });
    } else {
      next();
    }
  } else {
    if (isAuthenticated && to.name !== "true") {
      next({ name: "admin" });
    } else {
      next();
    }
  }
});
export default router
