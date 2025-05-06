import React, { useState } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function App() {
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const saveData = () => {
    const name = document.getElementById("name").value;
    const color = document.getElementById("color").value;

    if (name && color) {
      firebase
        .database()
        .ref("users/" + name)
        .set({ favoriteColor: color })
        .then(() => {
          alert("Data saved!");
        })
        .catch((error) => alert("Save error: " + error));
    } else {
      alert("Please fill in both fields.");
    }
  };

  const recallData = () => {
    const name = document.getElementById("name").value;
    if (name) {
      firebase
        .database()
        .ref("users/" + name)
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            document.getElementById("output").textContent = `Hello ${name}, your favorite color is ${data.favoriteColor}.`;
          } else {
            document.getElementById("output").textContent = `No data found for ${name}.`;
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    } else {
      alert("Enter a name to recall data.");
    }
  };

  return (
    <div className="App">
      <h1>Save Your Details</h1>
      <input type="text" id="name" placeholder="Enter your name" />
      <input type="text" id="color" placeholder="Enter your favorite color" />
      <button onClick={saveData}>Save</button>
      <button onClick={recallData}>Recall</button>
      <p id="output">No data yet.</p>

      {/* Dark mode toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Dark Mode
      </button>
    </div>
  );
}

export default App;
