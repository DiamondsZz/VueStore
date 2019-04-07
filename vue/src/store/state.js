export default {
  homecarousel: [],
  homenav: [],
  homeshoplist: [],
  login: {
    username: sessionStorage.getItem('username'),
    password: sessionStorage.getItem('password')
  },
  myshoplist: [],
  user: {
    icon: '',
    name: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).name:'' ,
    sex: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).sex:'' ,
    address: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).address:'' ,
    birth: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).birth:'' ,
    style: JSON.parse(sessionStorage.getItem('user'))!==null?JSON.parse(sessionStorage.getItem('user')).style:''
  }
}
