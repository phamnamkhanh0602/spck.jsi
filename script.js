const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const userEmail = document.getElementById("userEmail");

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnSave = document.getElementById("btnSaveNote");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let currentUser = null;

// LOGIN
btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await loginUser(email, password);
    } catch (err) {
        alert(err.message);
    }
});

// REGISTER
btnRegister.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await registerUser(email, password);
    } catch (err) {
        alert(err.message);
    }
});

// SAVE NOTE
btnSave.addEventListener("click", async () => {
    const text = noteInput.value.trim();
    if(text && currentUser) {
        await saveNoteToFirebase(text, currentUser.uid);
        noteInput.value = "";
    }
});

// AUTH STATE
listenAuthState((user) => {
    if(user) {
        currentUser = user;
        authSection.style.display = "none";
        appSection.style.display = "block";
        userEmail.innerText = user.email;

        loadUserNotes(user.uid, (notes) => {
            notesList.innerHTML = "";
            notes.forEach(note => {
                const div = document.createElement("div");
                div.className = "note-item";
                div.innerText = note.text;
                notesList.appendChild(div);
            });
        });

    } else {
        currentUser = null;
        authSection.style.display = "block";
        appSection.style.display = "none";
    }
});