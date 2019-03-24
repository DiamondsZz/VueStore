import Ajax from './Ajax'

const BASE_URL = '/api';
//const BASE_URL = 'http://127.0.0.1:3000';

//请求首页轮播图数据
export const getHomeCarousel =()=> Ajax(BASE_URL+'/api/homecarousel');

//请求首页导航图数据
export const getHomeNav =()=> Ajax(BASE_URL+'/api/homenav');

//请求首页商品列表数据
export const getHomeShopList =()=> Ajax(BASE_URL+'/api/homeshoplist');








