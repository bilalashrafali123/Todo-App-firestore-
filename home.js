import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html';
    }
});

let arr = []
const logout = document.querySelector('#logout-btn');

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });
});

const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const ul = document.querySelector("#ul");

async function getData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    arr = []; 
    querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() }); 
    });
    renderTodo();
}

getData();

function renderTodo() {
    ul.innerHTML = "";
    if (arr.length === 0) {
        ul.innerHTML = "Bhai Kuch Likh Le....🙄";
        return;
    }
    arr.forEach((item) => {
        ul.innerHTML += `
            <li class="div-1" id="${item.id}">${item.todo}
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
            </li> <br>
        `;
    });

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const li = event.target.parentElement;
            const id = li.id;
            await deleteDoc(doc(db, "todos", id));
            console.log("Data deleted");
            arr = arr.filter(item => item.id !== id);
            renderTodo();
        });
    });

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const li = event.target.parentElement;
            const id = li.id;
            const updatedNewValue = prompt("Enter new value");
            if (updatedNewValue) {
                const todoUpdate = doc(db, "todos", id);
                await updateDoc(todoUpdate, { todo: updatedNewValue });
                console.log("Data updated");
                const item = arr.find(item => item.id === id);
                if (item) {
                    item.todo = updatedNewValue;
                }
                renderTodo();
            }
        });
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const todoText = todo.value.trim();
    if (!todoText) return; 
    try {
        const docRef = await addDoc(collection(db, "todos"), { todo: todoText });
        console.log("Document written with ID: ", docRef.id);
        arr.push({ id: docRef.id, todo: todoText });
        renderTodo();
        todo.value=""
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});
