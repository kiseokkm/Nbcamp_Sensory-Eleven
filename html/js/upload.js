import {setSession, getSession, deleteSession} from "./session.js";
import database from "./database.js";
import { doc, getDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


// db initalize
const db = database.getDb();

/**
 * 세션id와 관리자id가 일치한지 확인한다.
 * @returns 일치하면 true, 일치하지 않으면 false
*/
const checkSessionUid = async() => {
    const q = doc(db, 'admin', 'id');
    const docs = await getDoc(q);
    const data = docs.data();
    if (getSession("uid") === data.uid)
        return true;
    return false;
}

/**
 * 저장 버튼 이벤트
 * @param {} e 버튼 객체
 */
const onClickSaveBtn = async(e) => {
    e.preventDefault();
    const notice = document.getElementById("notice");
    notice.innerText = "";
    if (!await checkSessionUid()) {
        alert('관리자만 등록 가능합니다.');
        return;
    }
    const form = document.forms[0];
    const data = {
        name: form.name.value,
        mbti: form.mbti.value,
        introduce: form.introduce.value,
        image_url: form.image_url.value,
        blog_url: form.blog_url.value,
        advantage: form.advantage.value,
        coop: form.coop.value
    }

    if (dataNullCheck(data)){
        const key = dataNullCheck(data);
        const element = form[key];
        console.log(key);
        element.focus();
        notice.innerText = `${element.name}을(를) 입력해주세요.`;
        return;
    }

    if (!dataListCheck(form.mbti.value)){
        form.mbti.focus();
        notice.innerText = `mbti를 정확히 입력해주세요.`;
        return;
    }

    try{
        const cardRef = doc(collection(db, "card"));
        await setDoc(cardRef, data);
    }catch (err) {
        alert("에러가 발생하여 데이터 저장에 실패하였습니다.");
        return;
    }
    
    alert("저장 완료했습니다.");
    location.reload();
}

/**
 *  사용자가 입력한 데이터가 datalist의 value에 있는지 확인한다.
 * @param {string} inputValue 
 * @returns 있으면 true, 없으면 false 반환
 */
const dataListCheck = (inputValue) => {
    const option = document.querySelector(`#list option[value='${inputValue}']`);
    if (option !== null) return true;
    return false;
}

/**
 * object형식으로된 데이터 null체크
 * @param {object} data
 * @returns null이라면 key 반환(true), 아니라면 true 반환
 */
const dataNullCheck = (datas) => {
    const keys = Object.keys(datas);
    for (let key of keys){
        if (datas[key] === "" || datas[key] === "undefined" || datas[key] === null){
            return key;
        }
    }
    return false;
}

// script start
const save_btn = document.getElementById("save_btn");
save_btn.addEventListener("click", onClickSaveBtn);