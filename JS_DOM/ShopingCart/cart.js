import './style.css'
import cartItemCount from './utilitis/cartItemCount'
import getItem from './utilitis/getItem';
import toggleSigninOut from './utilitis/toggleSigninOut';
import setItem from './utilitis/setitem';
import isLogin from './utilitis/islogin';


document.addEventListener('DOMContentLoaded', initialfunc);

function initialfunc() {
    toggleSigninOut();
    showCartItems();
    cartItemCount();
    showCartTotalsDetails();
}

function showCartItems() {
    if (!isLogin()) {
        return;
    }
    const cartItem = document.querySelector("#cartItem");
    const items = getItem('items');
    if (items) {
        for (const key in items) {
            createCartItemRow(items[key], key, cartItem)
        }
    }
}

function createCartItemRow(item, key, cartItem) {
    const div1 = document.createElement('div');
    const p1 = document.createElement('p');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const img = document.createElement('img');
    span1.setAttribute('class', 'visible md:hidden font-medium');
    span1.innerText = 'Name: ';
    span2.setAttribute('class', 'text-ellipsis overflow-hidden whitespace-nowrap');
    span2.innerText = item?.name;
    p1.setAttribute('class', 'flex gap-1 items-center')
    p1.appendChild(span1);
    p1.appendChild(img);
    p1.appendChild(span2);
    img.setAttribute('src', item?.thumbnail);
    img.setAttribute('class', 'w-[35px] object-contain rounded-lg');
    div1.setAttribute('class', 'md:w-[50%] md:py-2 px-1');
    div1.appendChild(p1)

    const div2 = document.createElement('div');
    const p2 = document.createElement('p');
    const span3 = document.createElement('span');
    const span4 = document.createElement('span');
    span3.setAttribute('class', 'visible md:hidden font-medium');
    span3.innerText = 'Price: ';
    span4.innerText = `$${item?.price.toFixed(2)}`;
    p2.appendChild(span3);
    p2.appendChild(span4);
    div2.setAttribute('class', 'md:w-[16.6%] md:py-2 px-1 flex items-center');
    div2.appendChild(p2)

    const div3 = document.createElement('div');
    const span5 = document.createElement('span');
    const input = document.createElement('input');
    span5.setAttribute('class', 'visible md:hidden font-medium');
    span5.innerText = 'Quantity: ';
    input.setAttribute('type', 'number');
    input.setAttribute('class', 'text-[#8e8e8e] font-semibold text-lg w-full rounded-md border-[1px] text-center quntInp');
    input.setAttribute('value', item?.count);
    input.setAttribute('min', 0);
    input.addEventListener('change', updateQuantity);
    div3.setAttribute('class', 'md:w-[16.6%] md:py-2 px-1 flex items-center');
    div3.appendChild(span5);
    div3.appendChild(input);

    const div4 = document.createElement('div');
    const p3 = document.createElement('p');
    const span6 = document.createElement('span');
    const span7 = document.createElement('span');
    span6.setAttribute('class', 'visible md:hidden font-medium');
    span7.setAttribute('class', 'sub_total');
    span6.innerText = 'Sub-Total: ';
    span7.innerText = `$${(item?.price * item?.count).toFixed(2)}`;
    p3.appendChild(span6);
    p3.appendChild(span7);
    div4.setAttribute('class', 'md:w-[16.6%] md:py-2 px-1 flex items-center');
    div4.appendChild(p3)

    const div5 = document.createElement("div");
    div5.setAttribute('class', 'flex flex-col md:flex-row w-full justify-between md:mb-0 mb-5 border-b-[1px] bg-[#262e39] rounded-t-md');
    div5.setAttribute('id', key);

    div5.appendChild(div1);
    div5.appendChild(div2);
    div5.appendChild(div3);
    div5.appendChild(div4);

    cartItem.appendChild(div5);
}

function updateQuantity(e) {
    if (e.target.value >= 0) {
        const price = parseFloat(e.target.parentElement.previousElementSibling.textContent.split('Price: $')[1]);
        const quantity = parseInt(e.target.value);
        let items = getItem('items');
        if (items) {
            if (items[e.target.parentElement.parentElement.id]) {
                items[e.target.parentElement.parentElement.id].count = quantity;
            }
            e.target.parentElement.nextElementSibling.children[0].children[1].innerText = `$${(price * quantity).toFixed(2)}`;
            setItem('items', items);
            cartItemCount();
            showCartTotalsDetails();
        }
    }
}

function showCartTotalsDetails() {
    let sub_sum = 0;
    const sub_total = document.getElementById("sum_price");
    const shipping = document.getElementById("shipping");
    const discount = document.getElementById("discount");
    const tax = document.getElementById("tax");
    const total = document.getElementById("total");

    const eachSubTotal = document.querySelectorAll(".sub_total");
    eachSubTotal.forEach((sub) => {
        sub_sum += parseFloat(sub.textContent.substring(1));
    })
    let ship_ammount = sub_sum > 0 ? 100 : 0;
    let discount_ammount = 0;
    let tax_ammount = 0;
    sub_total.innerText = `$${sub_sum.toFixed(2)} `;
    shipping.innerText = `$${ship_ammount.toFixed(2)} `;
    discount.innerText = `$${discount_ammount.toFixed(2)} `;
    tax.innerText = `$${tax_ammount.toFixed(2)} `;
    total.innerText = `$${(sub_sum + ship_ammount + discount_ammount + tax_ammount).toFixed(2)}`;
}