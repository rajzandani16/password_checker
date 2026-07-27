// ============================
// Elements
// ============================

const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const progressBar = document.getElementById("progressBar");
const strengthText = document.getElementById("strengthText");

const lengthValue = document.getElementById("lengthValue");
const scoreValue = document.getElementById("scoreValue");
const entropyValue = document.getElementById("entropyValue");
const crackTime = document.getElementById("crackTime");

const toast = document.getElementById("toast");

// Checklist Items
const checks = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

// ============================
// Events
// ============================

passwordInput.addEventListener("input", checkStrength);
togglePasswordBtn.addEventListener("click", togglePasswordVisibility);
copyBtn.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generatePassword);

// ============================
// Main Function
// ============================

function checkStrength() {

    const password = passwordInput.value;

    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    updateChecklist(hasLength, hasUpper, hasLower, hasNumber, hasSpecial);

    let score = 0;

    if (hasLength) score += 20;
    if (hasUpper) score += 20;
    if (hasLower) score += 20;
    if (hasNumber) score += 20;
    if (hasSpecial) score += 20;

    updateProgressBar(score);

    lengthValue.textContent = password.length;
    scoreValue.textContent = score + "%";

    updateEntropy(score);

}

// ============================
// Progress
// ============================

function updateProgressBar(score){

    progressBar.style.width = score + "%";

    if(score <= 20){

        progressBar.style.background = "#ff3b30";
        strengthText.textContent = "Weak";

    }else if(score <=40){

        progressBar.style.background = "#ff9500";
        strengthText.textContent = "Fair";

    }else if(score <=60){

        progressBar.style.background = "#ffcc00";
        strengthText.textContent = "Medium";

    }else if(score <=80){

        progressBar.style.background = "#34c759";
        strengthText.textContent = "Strong";

    }else{

        progressBar.style.background = "#00c853";
        strengthText.textContent = "Very Strong";

    }

}

// ============================
// Checklist
// ============================

function updateChecklist(length, upper, lower, number, special){

    updateItem(checks.length,length);
    updateItem(checks.uppercase,upper);
    updateItem(checks.lowercase,lower);
    updateItem(checks.number,number);
    updateItem(checks.special,special);

}

function updateItem(item,valid){

    if(valid){

        item.classList.add("valid");
        item.classList.remove("invalid");

        item.innerHTML="✅ "+item.textContent.replace("❌ ","").replace("✅ ","");

    }else{

        item.classList.add("invalid");
        item.classList.remove("valid");

        item.innerHTML="❌ "+item.textContent.replace("❌ ","").replace("✅ ","");

    }

}

// ============================
// Entropy
// ============================

function updateEntropy(score){

    if(score<=20){

        entropyValue.textContent="Very Low";
        crackTime.textContent="Instantly";

    }else if(score<=40){

        entropyValue.textContent="Low";
        crackTime.textContent="Few Minutes";

    }else if(score<=60){

        entropyValue.textContent="Medium";
        crackTime.textContent="Few Days";

    }else if(score<=80){

        entropyValue.textContent="High";
        crackTime.textContent="Several Years";

    }else{

        entropyValue.textContent="Excellent";
        crackTime.textContent="Millions of Years";

    }

}

// ============================
// Generate Password
// ============================

function generatePassword(){

    const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+?><:{}[]";

    let password="";

    for(let i=0;i<16;i++){

        password+=chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    passwordInput.value=password;

    checkStrength();

}

// ============================
// Copy
// ============================

function copyPassword(){

    if(passwordInput.value==="") return;

    navigator.clipboard.writeText(passwordInput.value);

    showToast("Password Copied!");

}

// ============================
// Toast
// ============================

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

// ============================
// Show / Hide Password
// ============================

function togglePasswordVisibility(){

    if(passwordInput.type==="password"){

        passwordInput.type="text";

        togglePasswordBtn.innerHTML=
        '<i class="fa-solid fa-eye-slash"></i>';

    }else{

        passwordInput.type="password";

        togglePasswordBtn.innerHTML=
        '<i class="fa-solid fa-eye"></i>';

    }

}

// ============================
// Initial State
// ============================

checkStrength();