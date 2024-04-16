import { getSession } from "./session.js";

export const checkLogin = () => {
    const card_upload_link = document.getElementById("card_upload_link");
    const login_btn = document.getElementById("login_btn");
    const signout_btn = document.getElementById("signout_btn");
    // 로그인 되어있을 때
    if (getSession("uid")){
        card_upload_link.classList.remove("hidden");
        login_btn.classList.add("hidden");
        signout_btn.classList.remove("hidden");
        return;
    }
    // 비회원일 때
    card_upload_link.classList.add("hidden");
    login_btn.classList.remove("hidden");
    signout_btn.classList.add("hidden");
}

window.addEventListener('DOMContentLoaded',()=>{
    checkLogin();
});