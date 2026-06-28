const toRegs = document.querySelector("#to-register");
const toLog = document.querySelector("#to-login");
const login = document.querySelector("#login");
const register = document.querySelector("#register");

// Forms submission
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

// Input data registration
const registerUsername = document.querySelector("#register-username");
const registerPassword = document.querySelector("#register-password");

// Input data login
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");

// --- Screen Toggling ---
toRegs.addEventListener("click", (e) => {
  e.preventDefault();
  login.classList.add("hidden");
  register.classList.remove("hidden");
});

toLog.addEventListener("click", (e) => {
  e.preventDefault();
  register.classList.add("hidden");
  login.classList.remove("hidden");
});

let validateInputs = (usernameVal, passwordVal) => {
  if (usernameVal.trim() === "" || passwordVal.trim() === "") {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
};

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const uName = registerUsername.value;
  const pWord = registerPassword.value;

  if (!validateInputs(uName, pWord)) return;

  const userObj = {
    username: uName,
    password: pWord,
  };

  localStorage.setItem("registeredUser", JSON.stringify(userObj));
  alert("Registration successful! Switching to login...");

  registerUsername.value = "";
  registerPassword.value = "";
  register.classList.add("hidden");
  login.classList.remove("hidden");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const uName = loginUsername.value;
  const pWord = loginPassword.value;

  if (!validateInputs(uName, pWord)) return;

  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!savedUser) {
    alert("No user found! Please register first.");
    return;
  }

  if (savedUser.username === uName && savedUser.password === pWord) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard/main.html";
    loginUsername.value = "";
    loginPassword.value = "";
  } else {
    alert("Invalid username or password.");
  }
});
