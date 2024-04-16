import {setSession, getSession, deleteSession} from "./session.js";
import database from "./database.js";
import {checkLogin} from "./comm.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// initalize
const auth = getAuth(database.getApp());

const signin_form_btn = document.getElementById("signin_form_btn");
const signout_btn = document.getElementById("signout_btn");

// 로그인 버튼 이벤트
const onClickLoginBtn = () => {
    const email = document.getElementById("signin_id").value;
    const pwd = document.getElementById("signin_pw").value;
    signInWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            const user = userCredential.user;
            // 세션에 값 저장
            setSession("uid", user.uid);
            // sign in 페이지 닫기
            checkLogin();
            $("#loginbtn").modal("hide");
        })
        .catch((error) => {
            alert("계정이 없거나 아이디 또는 비밀번호를 잘못 입력하셨습니다.");
        });
}

// 로그아웃 버튼 이벤트
const onClickSignoutBtn = () => {
    deleteSession();
    checkLogin();
}