import getItem from "./getItem";
import isLogin from './islogin';

export default function cartItemCount() {
    if (!isLogin()) {
        return;
    }
    const cartAmmount = document.querySelectorAll(".cartamnt");
    const items = getItem('items')
    if (items) {
        let numberOfItemInCart = 0;
        for (const key in items) {
            numberOfItemInCart += items[key].count;
        }
        cartAmmount.forEach(cart => cart.innerText = numberOfItemInCart)
    }
}