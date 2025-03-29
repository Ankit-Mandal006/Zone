import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3PibIJKSG6qIUqN3c90zXvv0gy1Fdz10",
    authDomain: "hostel-zone.firebaseapp.com",
    databaseURL: "https://hostel-zone-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "hostel-zone",
    storageBucket: "hostel-zone.firebasestorage.app",
    messagingSenderId: "86399762110",
    appId: "1:86399762110:web:95a0f8b35bf14c042e68ef",
    measurementId: "G-5WKDWLYSQF"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

document.getElementById("saveProfile").addEventListener("click", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            set(ref(db, "users/" + userId), {
                fullName: document.getElementById("fullName").value,
                github: document.getElementById("github").value,
                linkedin: document.getElementById("linkedin").value,
                portfolio: document.getElementById("portfolio").value,
                hostel: document.getElementById("hostel").value
            })
            .then(() => {
                alert("Profile saved successfully!");
            })
            .catch((error) => {
                console.error("Error saving profile:", error);
                alert("Failed to save profile!");
            });
        } else {
            alert("No user is signed in!");
        }
    });
});
