import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        const userRef = ref(db, "users/" + userId);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                document.getElementById("fullName").textContent = data.fullName || "N/A";
                document.getElementById("github").textContent = data.github || "N/A";
                document.getElementById("linkedin").textContent = data.linkedin || "N/A";
                document.getElementById("portfolio").textContent = data.portfolio || "N/A";
                document.getElementById("hostel").textContent = data.hostel || "N/A";
            } else {
                console.log("No user data found");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        console.log("User not logged in");
    }
});
