document.addEventListener("DOMContentLoaded", () => {
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== "") {
            appendMessage("user", message);
            sendRequestToServer(message);
            userInput.value = "";
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(`${sender}-message`);
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function sendRequestToServer(message) {
        const url = "http://localhost:8080/chatbot";
        const requestData = {
            message: message
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            const response = data.response;
            appendMessage("bot", response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
