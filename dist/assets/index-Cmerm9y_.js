(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();function m(n){const t={weekday:"short",month:"long",day:"numeric"};return n.toLocaleString("en-US",t)}function c(n){let e=new URL(n).hostname;return e.startsWith("www.")&&(e=e.slice(4)),e}const d=[{id:103,title:"Invisible Details of Interaction Design",shortedLink:"rauno.me",link:"https://rauno.me/craft/interaction-design",timeSubmitted:"Wednesday, Mar 13",classAdded:!1},{id:104,title:"uilabs",shortedLink:"uilabs.dev",link:"https://www.uilabs.dev",timeSubmitted:"Friday, Mar 15",classAdded:!1},{id:106,title:"Habits of great software engineers",shortedLink:"vadimkravcenko.com",link:"https://vadimkravcenko.com/shorts/habits-of-great-software-engineers/?ref=dailydev",timeSubmitted:"Friday, Mar 15",classAdded:!1}],f=document.getElementById("links-container"),l=document.getElementById("form-link"),s=document.getElementById("loading-message");window.addEventListener("DOMContentLoaded",()=>{u(d)});l.addEventListener("submit",n=>{if(n.preventDefault(),n.value==="")return;let t=l.querySelector("#user-link").value;h(t),setTimeout(()=>{s.setAttribute("aria-hidden","true")},"2500"),l.querySelector("#user-link").value=""});function u(n){let t=n.map(e=>`
          <li class="main__link" aria-hidden=${e.classAdded}>
            <a href=${e.link} target="_blank">
              <div>
                <?xml version="1.0" encoding="UTF-8"?><svg
                width="27px"
                height="27px"
                stroke-width="1.9"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
                >
                <path
                d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
                ></path>
                <path
                d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
                ></path>
                </svg>
                <h3>${e.title}</h3>
                <span> ${e.shortedLink} </span>
              </div>
                <p>${e.timeSubmitted}</p>
            </a>
          </li>
    `);t=t.reverse().join(""),f.innerHTML=t}async function h(n){let t=self.crypto.randomUUID();try{const e=await p(n),o={id:t,title:e==="error"?c(n):e,shortedLink:c(n),link:n,timeSubmitted:m(new Date),classAdded:!1};d.push(o),console.log("New Object Created:",o),u(d)}catch(e){console.error("Error creating the link",e)}}async function p(n){try{const e=await(await fetch(n)).text(),o=document.createElement("div");o.innerHTML=e;const r=o.querySelector("title");return s.setAttribute("aria-hidden","false"),s.setAttribute("data-error","false"),s.innerText="Link successfully saved",r?r.textContent.trim():"Untitled"}catch(t){return console.error("Error fetching title:",t),s.setAttribute("aria-hidden","false"),s.setAttribute("data-error","true"),s.innerText="Error getting title: "+t,"error"}}
