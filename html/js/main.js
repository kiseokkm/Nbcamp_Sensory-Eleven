import database from "./database.js";
import { doc, getDocs, collection, query } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const getCardData = async () => {
    const member_card = document.querySelector("#member_card");
    const db = database.getDb();
    const q = query(collection(db, "card"));
    const dataSnapshot = await getDocs(q);
    dataSnapshot.forEach(doc => {
        const datas = doc.data();
        console.log(datas.name);
        const temp = document.createElement("div");
        temp.innerHTML = `
    <div class="row align-items-center" style="padding: 60px 70px; border-radius: 60px; background-color: #f6f5fc;margin-top: 56px">
            <div class="col-lg-6 py-3 wow fadeInUp">
              <span class="subhead">About us</span>
              <h2 class="title-section">${datas.name}</h2>
              <div class="divider"></div>
    
              <p>객관적으로 살펴본 자신의 장점</p>
              <p>자신의 스타일 협업 스타일 소개</p>
              <a href="about.html?doc_id=${datas.id}" class="btn btn-primary mt-3">Read More</a>
            </div>
            <div class="col-lg-6 py-3 wow fadeInRight">
              <div class="img-fluid py-3 text-center">
                <img src="${datas.image_url}" alt="" style="max-height: 250px; border-radius: 100%;">
              </div>
            </div>
          </div>
    `;    
    member_card.append(temp);
    });

}

getCardData();