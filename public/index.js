let status = new URLSearchParams(window.location.search).get("status");
let statusBox = document.getElementById("status");

if (status === "0") {
    statusBox.innerHTML = "Success!"
    statusBox.classList.add("text-success")
} else if (status === "1") {
    statusBox.innerHTML = "Error!"
    statusBox.classList.add("text-danger")
}