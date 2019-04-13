export default {
  //首页轮播图数据
  homecarousel: [],
  //首页导航菜单数据
  homenav: [],
  //首页商品数据
  homeshoplist: [],
  //用户登录信息
  login: {
    username: sessionStorage.getItem('username'),
    password: sessionStorage.getItem('password')
  },
  //个人中心 商品推荐数据
  myshoplist: [],
  //用户信息
  user: {
    icon: '',
    name: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).name:'' ,
    sex: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).sex:'' ,
    address: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).address:'' ,
    birth: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).birth:'' ,
    style: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).style:''
  },
  //购物车页面商品信息
  busshoplist:JSON.parse(localStorage.getItem('busshoplist'))===null?[]: JSON.parse(localStorage.getItem('busshoplist')),

 //购物车数据
  bus: JSON.parse(localStorage.getItem('bus'))===null?[]: JSON.parse(localStorage.getItem('bus')),
}
