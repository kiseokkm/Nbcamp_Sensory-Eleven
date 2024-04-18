import Header from "../component/header.js";
import Footer from "../component/footer.js";
import  { setSession, getSession } from "./session.js";
import database from "./database.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// header, footer 붙이는 부분
customElements.define('app-header', Header);
customElements.define('app-footer', Footer);

/**
 * 세션id와 관리자id가 일치한지 확인한다.
 * @returns 일치하면 true, 일치하지 않으면 false
*/
export const comm_checkSessionUid = async() => {
    const db = database.getDb();
    const q = doc(db, 'admin', 'id');
    const docs = await getDoc(q);
    const data = docs.data();
    if (getSession("uid") === data.uid)
        return true;
    return false;
}

export const comm_setSession = (name, value) => {
    setSession(name, value);
}

export const comm_getSession = (name) => {
    return getSession(name);
}