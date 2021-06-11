const formLogin = document.getElementById("formLogin");
const login = document.getElementById("login");

login.addEventListener("click", (e) => {
    e.preventDefault();
    const user = formLogin.user.value;
    const pwd = formLogin.pwd.value;

    if (user === "1" && pwd === "1") {
        alert("Logado com sucesso.");
        window.location.href = "admin-area.html";
    } else {
        alert('Usuario ou senha incorreta');
    }
})