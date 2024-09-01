import toggleSigninOut from './toggleSigninOut'

export default function signout() {
    localStorage.removeItem('islogin');
    window.location.replace('/');
    toggleSigninOut();
}