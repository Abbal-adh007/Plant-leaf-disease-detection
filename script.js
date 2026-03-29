// hiding register form by making login form active 
function showForm(formId){
    const forms = document.querySelectorAll(".form-box");
    forms.forEach(form => form.classList.remove("active"));

    const selectedForm = document.getElementById(formId);
    if(selectedForm){
        selectedForm.classList.add("active");
    }
}


// demo login
const loginForm = document.querySelector("#login-form form");

if(loginForm){
    loginForm.addEventListener("submit", function(e){ 
        e.preventDefault();
        window.location.href = "home.html";
    });
}


// demo register 
const registerForm = document.querySelector("#register-form form");

if(registerForm){
    registerForm.addEventListener("submit", function(e){
        e.preventDefault();

        const formData = new FormData(this);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmpassword");

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        alert("Registered successfully!");
        showForm("login-form");
    });
}


// nav link menu on small screen 
const navLinks = document.getElementById("navLinks");

function showMenu(){
    if(navLinks){
        navLinks.style.right = "0";
    }
}

function hideMenu(){
    if(navLinks){
        navLinks.style.right = "-200px";
    }
}


// image preview 
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

if(fileInput && preview){
    fileInput.addEventListener("change", function(){
        const file = this.files[0];

        if(file){
            const reader = new FileReader();

            reader.onload = function(e){
                preview.src = e.target.result;
                preview.style.display = "block";
            }

            reader.readAsDataURL(file);
        }
    });
}


// live camera 
let cameraStream = null;

function startCamera() {
    const video = document.getElementById("camera");
    const captureBtn = document.getElementById("captureBtn");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraStream = stream;
            video.srcObject = stream;
            video.style.display = "block";
            captureBtn.style.display = "inline-block";
        })
        .catch(() => {
            alert("Camera access denied!");
        });
}

function captureImage() {
    const video = document.getElementById("camera");
    const preview = document.getElementById("preview");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    preview.src = imageData;
    preview.style.display = "block";

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }

    video.style.display = "none";
    document.getElementById("captureBtn").style.display = "none";
}


// analysis 
function analyzeImage() {
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");

    if (!fileInput.files.length && preview.style.display === "none") {
        alert("Please upload or capture an image first.");
        return;
    }

    let existingResult = document.getElementById("result-box");
    if (existingResult) existingResult.remove();

    const resultSection = document.createElement("section");
    resultSection.className = "result-section";

    const resultBox = document.createElement("div");
    resultBox.id = "result-box";
    resultBox.className = "result-box";
    resultBox.innerHTML = "<p>Analyzing image... ⏳</p>";

    resultSection.appendChild(resultBox);

    const uploadSection = document.getElementById("upload");
    uploadSection.insertAdjacentElement("afterend", resultSection);

    // demo result
    setTimeout(() => {
        resultBox.innerHTML = `
            <h3>Disease: Prem Rog</h3>
            <p><b>Confidence:</b> 92%</p>
        `;
    }, 2000);
}


// user activity session 
const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");

if(userIcon && userDropdown){
    userIcon.addEventListener("click", () => {
        userDropdown.style.display =
            userDropdown.style.display === "flex" ? "none" : "flex";
    });

    window.addEventListener("click", (e) => {
        if(!userIcon.contains(e.target) && !userDropdown.contains(e.target)){
            userDropdown.style.display = "none";
        }
    });
}


const userText = document.querySelector("#userDropdown p");

if(userText){
    const username = localStorage.getItem("username") || "User";
    userText.innerText = "Hi, " + username;
}


// logout by just triggering index.html 
const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "index.html";
    });
}
