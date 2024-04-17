import { startHeaderEvent } from "../js/headerEvent.js";

const login_modal_html = `
<!-- 로그인 모달 -->
<div class="modal fade" id="loginbtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="transform: translate(0%, 20%);">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">로그인</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-floating mb-3">
          <label for="floatingInput">ID</label>
          <input id="signin_id" type="email" class="form-control rounded-4" id="floatingInput">
        </div>
        <div class="form-floating mb-3">
          <label for="floatingPassword">Password</label>
          <input id="signin_pw" type="password" class="form-control rounded-4" id="floatingPassword">
        </div>
        <button id="signin_form_btn" class="w-100 mb-2 btn btn-lg rounded-4 btn-primary">Sign
          in</button>
      </div>
    </div>
  </div>
</div>
`

class Header extends HTMLElement {
    constructor(){
      super();
      this.innerHTML = `
    <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky" data-offset="500">
      <div class="container">
        <a href="index.html" class="navbar-brand"><span class="text-primary">Sensory</span>-Eleven</a>
  
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="navbar-collapse collapse" id="navbarContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="guest.html">방명록 작성</a>
            </li>
            <li class="nav-item hidden" id="card_upload_link">
              <a class="nav-link" href="upload.html">멤버 카드 작성</a>
            </li>
            <button id="login_btn" type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
              data-bs-target="#loginbtn">
              Sign In
            </button>
            <button id="signout_btn" type="button" class="btn btn-outline-primary hidden">
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  </header>
    ` + login_modal_html;
    }

    connectedCallback() {
      startHeaderEvent();
    }
}

export default Header;