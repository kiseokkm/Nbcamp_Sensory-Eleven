import database from "./database.js";
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { comm_checkSessionUid, comm_getSession } from "./comm.js";

// db initalize
const db = database.getDb();
const form = document.forms[0];

const getUpdateData = (update_doc_id) => {
    const docRef = doc(db, "card", update_doc_id);
    getDoc(docRef).then(res => {
        if (res.exists()){
            res = res.data();
            form.name.value = res.name;
            form.mbti.value = res.mbti;
            form.introduce.value = res.introduce;
            form.image_url.value = res.image_url;
            form.github_url.value = res.github_url;
            form.blog_url.value = res.blog_url;
            form.advantage.value = res.advantage;
            form.coop.value = res.coop;
        }
    })
}

const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('st');
const update_doc_id = comm_getSession("update_id");
const read_btn = document.getElementById("read_btn");
if (status && update_doc_id){
    getUpdateData(update_doc_id);
    read_btn.classList.remove("hidden");
}


/**
 * 저장 버튼 이벤트
 * @param {} e 버튼 객체
 */
const onClickSaveBtn = async(e) => {
    e.preventDefault();
    const notice = document.getElementById("notice");
    notice.innerText = "";
    const doc_id = crypto.randomUUID();
    if (!await comm_checkSessionUid()) {
        alert('관리자만 등록 가능합니다.');
        return;
    }
    const data = {
        id: doc_id,
        name: form.name.value,
        mbti: form.mbti.value,
        introduce: form.introduce.value,
        image_url: form.image_url.value,
        github_url: form.github_url.value,
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
        if (status && update_doc_id){
            data.id = update_doc_id;
            const docRef = doc(db, "card", update_doc_id);
            await updateDoc(docRef, data)
            alert("수정 완료했습니다.");
            location.reload();
            return;
        }
        const cardRef = doc(db, "card", doc_id)
        await setDoc(cardRef, data);
        alert("저장 완료했습니다.");
        location.reload();
    }catch (err) {
        alert("에러가 발생하여 데이터 저장에 실패하였습니다.");
        return;
    }
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

const onClickReadBtn = (e) => {
    e.preventDefault();
    location.href = `./about.html?doc_id=${update_doc_id}`;
}

// script start
const save_btn = document.getElementById("save_btn");
save_btn.addEventListener("click", onClickSaveBtn);
read_btn.addEventListener("click", onClickReadBtn);