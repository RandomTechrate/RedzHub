// Backend URL for the Survival server
const BACKEND_URL = "http://83.168.106.235:21000"; // Updated to use port 21000

// Function to check the server's status
function checkServerStatus() {
    fetch(`${BACKEND_URL}/status`)
        .then((res) => res.text())
        .then((data) => {
            const statusEl = document.getElementById("serverStatus");
            statusEl.innerText = data;
            statusEl.style.color = "#4ade80"; // Green for online
        })
        .catch(() => {
            const statusEl = document.getElementById("serverStatus");
            statusEl.innerText = "🔴 Offline";
            statusEl.style.color = "#f87171"; // Red for offline
        });
}

// Function to execute a server command
function executeCommand() {
    const command = document.getElementById("commandInput").value;

    if (!command) {
        document.getElementById("commandOutput").textContent = "⚠️ Please enter a command.";
        return;
    }

    fetch(`${BACKEND_URL}/command`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: command,
    })
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("commandOutput").textContent = `✅ ${data}`;
        })
        .catch((err) => {
            document.getElementById("commandOutput").textContent = `❌ Error: ${err.message}`;
        });
}

// Automatically check server status on load
document.addEventListener("DOMContentLoaded", checkServerStatus);
