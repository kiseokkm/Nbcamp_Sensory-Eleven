import {setSession, getSession, deleteSession} from "./session.js";
import database from "./database.js";

/**
 * 세션id와 관리자id가 일치한지 확인한다.
 * @returns 일치하면 true, 일치하지 않으면 false
 */
 const checkSessionUid = () => {
    if (getSession("uid") === uid)
        return true;
    return false;
}