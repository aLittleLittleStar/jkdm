import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index.js';
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Index,
    redirect: "/home",
    children: [
      // 首页
      {
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: 'home'
        }
      },
      // 动漫
      {
        path: '/comic',
        component: () => import('../views/comic/comic.vue'),
        meta: {
          title: 'comic'
        }
      },
      // 关于我们
      {
        path: '/aboutus',
        component: () => import('../views/aboutUs/aboutUs.vue'),
        meta: {
          title: 'aboutus'
        }
      },
      // 个人中心
      {
        path: '/usercenter',
        component: () => import('../views/UserCenter.vue'),
        meta: {
          title: 'UserCenter'
        }
      },
      {
        path: '/recharge',
        component: () => import('../views/recharge.vue'),
        meta: {
          title: 'Recharge'
        }
      },
      // 详情页面
      {
        path: '/imgDetail/:id',
        component: () => import('../views/imgDetail.vue'),
        meta: {
          title: 'imgDetail'
        }
      },
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login'
    }
  },
  // 注册
  {
    path: '/register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register'
    }
  },
  // 找回密码
  {
    path: '/retrieve',
    component: () => import('../views/Retrieve.vue'),
    meta: {
      title: 'Retrieve'
    }
  },
  {
    path: '/agreement',
    component: () => import('../views/agreement.vue'),
    meta: {
      title: 'Agreement'
    }
  },
];

const router = new VueRouter({
  routes
});


// // 非登录状态先登录
// router.beforeEach((to, from, next) => {
//   let isLogin = store.state.isLogin
//   // 用户未登录的情况下只能跳转到首页
//   if (!isLogin) {
//     if (to.path == '/login' || to.path !== '/register' || to.path !== '/retrieve') {
//       next({ path: '/login' })
//       return
//     }
//   }
//   next()
// })


export default router;
