import isLogin from './islogin';
import signout from './signout';

export default function toggleSigninOut() {
  const signinoutlink = document.querySelectorAll('.signinoutlink');
  let link;
  if (isLogin()) {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'flex flex-wrap items-center gap-[3px]');
    btn.addEventListener('click', signout);
    const p = document.createElement('p');
    p.innerText = 'Logout';
    btn.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                        stroke-width="1.5" stroke-linecap="round" class="stroke-current" />
                      <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" class="stroke-current" />
                    </svg>`;
    btn.appendChild(p);
    link = btn;
  } else {
    const a = document.createElement('a');
    a.setAttribute('class', 'flex items-center gap-[3px]');
    a.setAttribute('href', 'signup.html');
    const p = document.createElement('p');
    p.setAttribute('class', 'text-sm font-medium');
    p.innerText = 'Signin';
    a.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current fill-none" />
            </svg>
    `;
    a.appendChild(p);
    link = a;
  }
  signinoutlink.forEach(pageNavlink => {
    pageNavlink.innerText = '';
    pageNavlink.appendChild(link);
  })
}