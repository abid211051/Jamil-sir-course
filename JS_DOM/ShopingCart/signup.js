import './style.css'
import cartItemCount from './utilitis/cartItemCount'
import toggleSigninOut from './utilitis/toggleSigninOut';
import setItem from './utilitis/setitem';


document.addEventListener('DOMContentLoaded', initialfunc);

function initialfunc() {
    toggleSigninOut();
    const userAuth = document.querySelector(".authForm");
    const btnpage = document.getElementById('btnpage');
    const signinBtn = document.getElementById('signinBtn');
    userAuth.addEventListener('submit', authenticateUser);
    btnpage.addEventListener('click', leftToRightTransition);
    signinBtn.addEventListener('click', rightToLeftTransition);
    cartItemCount();

}

let timeout;
function authenticateUser(e) {
    const authError = document.querySelector('#autherror');
    if (e.target.username.value !== 'user' || e.target.password.value !== 'user') {
        authError.classList.replace('hidden', 'flex')
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            authError.classList.replace('flex', 'hidden')
        }, 3000)
        return;
    }
    setItem('islogin', e.target.username.value);
    window.location.replace('/');
}

function leftToRightTransition() {
    const formdiv = document.querySelector('.formdiv');
    const btnDiv = document.querySelector('.btnDiv');
    formdiv.classList.replace('right-0', '-right-[589.6px]');
    btnDiv.classList.replace('right-[589.6px]', 'right-0')
}

function rightToLeftTransition() {
    const formdiv = document.querySelector('.formdiv');
    const btnDiv = document.querySelector('.btnDiv');
    formdiv.classList.replace('-right-[589.6px]', 'right-0');
    btnDiv.classList.replace('right-0', 'right-[589.6px]')
}