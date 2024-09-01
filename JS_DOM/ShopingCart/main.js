import './style.css'
import getItem from './utilitis/getItem'
import cartItemCount from './utilitis/cartItemCount';
import toggleSigninOut from './utilitis/toggleSigninOut';
import isLogin from './utilitis/islogin';
import setItem from './utilitis/setitem';

document.addEventListener('DOMContentLoaded', initialfunc);

let needBtn = 0;
function initialfunc() {
    setItem('page', '1');
    toggleSigninOut();
    createCategory();
    createItemCard(true);
    cartItemCount();
}

function pageBtn(i) {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'py-1 px-3 border h-min bg-[#1C232B]');
    btn.setAttribute('id', `page-${i}`);
    btn.innerText = i;
    btn.addEventListener('click', changePageAndItems);
    return btn;
}
function threeDot() {
    const p = document.createElement('p');
    p.setAttribute('class', 'py-1 px-3.5 border font-bold h-min bg-[#1C232B]');
    p.innerText = '. . .';
    return p;
}

// For all apps
function createInitialPageBtn() {
    const pagebtndiv = document.querySelector('.pagebtndiv');
    pagebtndiv.innerText = "";
    if (needBtn > 7) {
        for (let i = 1; i <= 6; i++) {
            pagebtndiv.appendChild(pageBtn(i))
        }
        pagebtndiv.appendChild(threeDot());
        pagebtndiv.appendChild(pageBtn(needBtn));
    } else {
        for (let i = 1; i <= needBtn; i++) {
            pagebtndiv.appendChild(pageBtn(i))
        }
    }
    document.getElementById('page-1').classList.add("bg-emerald-700");
}

function changePageAndItems(e) {
    let limit = 5;
    const pagebtndiv = document.querySelector('.pagebtndiv');
    pagebtndiv.innerText = "";
    const pageNumber = parseInt(e.target.textContent);
    if (needBtn <= 7) {
        for (let i = 1; i <= needBtn; i++) {
            pagebtndiv.appendChild(pageBtn(i));
        }
    } else {
        if ((pageNumber - 1) < limit) {
            for (let i = 1; i <= 6; i++) {
                pagebtndiv.appendChild(pageBtn(i));
            }
            pagebtndiv.appendChild(threeDot());
            pagebtndiv.appendChild(pageBtn(needBtn));
        } else if ((pageNumber - 1) >= limit && (needBtn - pageNumber) >= limit) {
            pagebtndiv.appendChild(pageBtn(1));
            pagebtndiv.appendChild(threeDot());
            for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
                pagebtndiv.appendChild(pageBtn(i));
            }
            pagebtndiv.appendChild(threeDot());
            pagebtndiv.appendChild(pageBtn(needBtn));
        } else if ((pageNumber - 1) >= limit && (needBtn - pageNumber) < limit) {
            const btnInHand = (needBtn + 1) - pageNumber;
            const for7Btn = 7 - (btnInHand + 1);
            const iterStart = pageNumber - for7Btn;
            pagebtndiv.appendChild(pageBtn(1));
            pagebtndiv.appendChild(threeDot());
            for (let i = iterStart; i <= needBtn; i++) {
                pagebtndiv.appendChild(pageBtn(i));
            }
        }
    }
    setItem('page', e.target.textContent);
    createItemCard();
    document.getElementById(`page-${e.target.textContent}`).classList.add("bg-emerald-700");
}

async function createCategory() {
    try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const allCategory = await res.json();

        const categoryDiv = document.querySelector('.categoryDiv');
        allCategory.map(category => {
            const btn = document.createElement('button');
            btn.setAttribute('class', 'active:scale-90 px-2 py-1.5 rounded-sm bg-[#1C232B]');
            btn.setAttribute('title', category?.url);
            btn.innerText = category?.name;
            btn.addEventListener('click', (e) => {
                setItem('page', '1');
                setItem('category', e.target.title);
                createItemCard(true);
            })
            categoryDiv.appendChild(btn);
        })
    } catch (error) {
        console.log(error);
    }
    const allProd = document.querySelector('.allProd');
    allProd.addEventListener('click', () => {
        setItem('page', '1');
        localStorage.removeItem('category');
        createItemCard(true);
    })
}

async function createItemCard(isinit) {
    let itemsData;
    const skip = (parseInt(getItem('page')) - 1) * 14;
    const category = getItem('category');
    const url = category ?
        `${category}?limit=14&skip=${skip}&select=title,thumbnail,discountPercentage,price,description`
        :
        `https://dummyjson.com/products?limit=14&skip=${skip}&select=title,thumbnail,discountPercentage,price,description`
    try {
        const res = await fetch(url);
        itemsData = await res.json();
        needBtn = Math.ceil(parseInt(itemsData.total) / 14);
        isinit ? createInitialPageBtn() : null
    } catch (error) {
        console.log(error);
    }
    const prodWarning = document.getElementById('prodWarning');
    const cartDiv = document.querySelector('.cartDiv');
    cartDiv.innerText = "";
    itemsData && itemsData.products.length > 0 ? itemsData?.products?.map((item) => {
        prodWarning.classList.add('hidden')
        const p1 = document.createElement('p');
        const span1 = document.createElement('span');
        const br1 = document.createElement('br');
        const span2 = document.createElement('span');
        p1.setAttribute('class', 'w-[50px] text-xs text-center absolute top-0 right-0 rounded-se-md rounded-es-md bg-indigo-500 font-medium py-1 text-slate-200 z-10');
        span1.innerText = `${item?.discountPercentage.toFixed(2)}%`;
        span2.innerText = 'OFF';
        p1.appendChild(span1);
        p1.appendChild(br1);
        p1.appendChild(span2);

        const img1 = document.createElement('img');
        img1.setAttribute('src', item?.thumbnail);
        img1.setAttribute('class', 'h-[160px] mb-3 hover:scale-110 transition-all');

        const p2 = document.createElement('p');
        p2.setAttribute('class', 'font-medium overflow-hidden text-ellipsis whitespace-nowrap mb-3');
        p2.innerText = `${item?.title}`;

        const p3 = document.createElement('p');
        p3.setAttribute('class', 'overflow-hidden h-[35px] text-xs mb-1');
        p3.innerText = `${item?.description}`;

        const div1 = document.createElement('div');
        const del1 = document.createElement('del');
        const p4 = document.createElement('p');
        div1.setAttribute('class', 'flex justify-between mb-5');
        del1.innerText = `$${(item?.price + (item?.price * (item?.discountPercentage / 100))).toFixed(2)}`;
        p4.innerText = `$${item?.price.toFixed(2)}`;
        div1.appendChild(del1);
        div1.appendChild(p4);

        const p5 = document.createElement('p');
        p5.setAttribute('class', 'absolute bottom-[43px] text-xs text-rose-500 hidden transition-all');
        p5.innerText = "* Please Login first";

        const btn1 = document.createElement('button');
        btn1.setAttribute('class', 'bg-indigo-500 font-semibold text-slate-50 p-1 w-full rounded-md active:scale-95 addToCart');
        btn1.innerText = 'ADD TO CART';
        btn1.addEventListener('click', addItemIntoCart);

        const div2 = document.createElement('div');
        div2.setAttribute('class', 'w-[200px] h-[340px] p-2 relative flex flex-col rounded-md overflow-hidden bg-[#1C232B]');
        div2.setAttribute('id', `item-${item?.id}`);
        div2.appendChild(p1);
        div2.appendChild(img1);
        div2.appendChild(p2);
        div2.appendChild(p3);
        div2.appendChild(div1);
        div2.appendChild(p5);
        div2.appendChild(btn1);

        cartDiv.appendChild(div2);
    }) : prodWarning.classList.remove('hidden')

    isItemInCart();
}


function addItemIntoCart(e) {
    if (!isLogin()) {
        e.target.previousElementSibling.classList.remove('hidden');
        setTimeout(() => {
            e.target.previousElementSibling.classList.add('hidden');
        }, 3500)
        return;
    }
    const item = {
        name: e.target.parentElement.children[2].textContent,
        price: parseFloat((e.target.previousElementSibling.previousElementSibling.children[1].textContent).split('$')[1]),
        thumbnail: e.target.parentElement.children[1].src,
        count: 1
    }
    let items = getItem('items');
    e.target.innerText = "ALREADY IN CART";
    e.target.className = "bg-[#FB923C] font-semibold text-slate-50 p-1 addToCart w-full rounded-md active:scale-95";
    if (items) {
        if (items[e.target.parentElement.id]) {
            return;
        }
        items = { ...items, [e.target.parentElement.id]: item }
        setItem('items', items);
        cartItemCount();
        return;
    }
    setItem('items', { [e.target.parentElement.id]: item });
    cartItemCount();
}

function isItemInCart() {
    if (!isLogin()) {
        return;
    }
    let items = getItem('items');
    if (items) {
        for (const key in items) {
            const div = document.getElementById(key)
            div.lastElementChild.innerText = "ALREADY IN CART";
            div.lastElementChild.className = "bg-[#FB923C] font-semibold text-slate-50 p-1 addToCart w-full rounded-md active:scale-95";
        }
    }
}