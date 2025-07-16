document.addEventListener("DOMContentLoaded", () => {
    const chatApp = new ChatApp();
    chatApp.init();
});

class ChatApp {
    init() {
        console.log("page 초기화 완료");

        this.initVariable();
        this.bindEvents();
    }

    // SET Element
    initVariable() {
        this.chatContainer = document.getElementById("chat-container");
        this.userInput = document.getElementById("user-input");
        this.sendButton = document.getElementById("send-button");
    }

    // SET Event
    bindEvents() {
        this.sendButton.addEventListener("click", this.handleUserInput.bind(this));

        this.userInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        });
    }

    // SET Input Form
    handleUserInput() {
        const content = this.userInput.value.trim();
        if (!content) return;

        this.appendMessage(content, "user");
        this.userInput.value = "";

        this.requestGpt(content);
    }

    requestGpt(content) {
        const payload = {
            messages: [{ role: "user", content }]
        };

        fetch("/api/gpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                this.appendMessage(data.result, "bot");
            })
            .catch(err => {
                console.error("GPT 오류:", err);
                this.appendMessage("오류가 발생했습니다.", "bot");
            });
    }

    appendMessage(text, role) {
        const div = document.createElement("div");
        div.className = `message ${role}`;
        div.textContent = text;
        this.chatContainer.appendChild(div);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
}
