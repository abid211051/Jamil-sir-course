export default function isLogin() {
    const islogin = localStorage.getItem('islogin');
    if (islogin) return true;
    else return false;
}