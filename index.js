const icons = document.querySelectorAll("#icons i");
const closedoor = document.getElementById("close-door");
const openDoorBtn = document.getElementById("open-door");
const slider = document.getElementById("slider");
const mainContent = document.getElementById("main-content");
const chat=document.querySelector("#chat");
const innerchat=document.querySelector("#innerchat");
const chatbox=document.querySelector("#chatbox");
// Function to toggle slider
function toggleSlider(action) {
    if (action === "open") {
        slider.style.width = "250px";
        mainContent.style.width = "calc(100vw - 250px)";
        icons.forEach(item => item.style.display = "none");
    } else if (action === "close") {
        slider.style.width = "0px";
        mainContent.style.width = "100vw";
        icons.forEach(item => item.style.display = "");
    }
}

// Open button event
openDoorBtn.addEventListener("click", function () {
    if (slider.style.width === "250px") {
        toggleSlider("close");
    } else {
        toggleSlider("open");
    }
});

// Close button event
closedoor.addEventListener("click", function () {
    toggleSlider("close");
});

if (chat) {
  chat.addEventListener("click", () => {
    location.reload(); // This refreshes the page, starting a "new chat"
  });
}
if (innerchat) {
  innerchat.addEventListener("click", () => {
    location.reload(); // This refreshes the page, starting a "new chat"
  });
}
if (chatbox) {
    chatbox.addEventListener("click", () => {
    location.reload(); // This refreshes the page, starting a "new chat"
  });
}

const search=document.querySelector("#search");
const wraper=document.querySelector("#wraper");
const cancel=document.querySelector("#cancel");


search.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent click from bubbling up
  wraper.classList.add("active");
});

// Collapse wrapper on cancel click
cancel.addEventListener("click", (e) => {
  e.stopPropagation();
  wraper.classList.remove("active");
});

// Collapse wrapper on clicking anywhere else on screen
document.addEventListener("click", (e) => {
  if (!wraper.contains(e.target) && !search.contains(e.target)) {
      wraper.classList.remove("active");
  }
});


const upgrade=document.querySelector("#upgrade");
const subscription=document.querySelector("#subscription");
const close=document.querySelector("#close");


upgrade.addEventListener("click", () => {
  subscription.classList.add("active");
});

close.addEventListener("click", () => {
  subscription.classList.remove("active");
});




const showGuidelines = document.querySelector("#show-guidelines");
const guidelines = document.querySelector("#guidelines");
const closeGuidelines = document.querySelector("#close-guidelines");

showGuidelines.addEventListener("click", () => {
  guidelines.classList.add("active");
});

closeGuidelines.addEventListener("click", () => {
  guidelines.classList.remove("active");
});
















const line = document.querySelector(".content h2");
const chatContainer = document.getElementById("chatContainer");
const plane=document.querySelector("#plane");
const userInput=document.querySelector("#userInput");
const voiceButton = document.getElementById("voiceButton");

chatContainer.style.display = "none";

// Toggle plane/voice button based on input
userInput.addEventListener("input", () => {
  if (userInput.value.trim() !== "") {
    plane.style.display = "inline-block";
    voiceButton.style.display = "none";
  } else {
    plane.style.display = "none";
    voiceButton.style.display = "inline-block";
  }
});

// Send on Enter
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Send on Plane Click
plane.addEventListener("click", function () {
  sendMessage();
});

// Send Message Function
async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  // Hide plane & show voice after send
  plane.style.display = "none";
  voiceButton.style.display = "inline-block";

  line.style.display = "none";
  chatContainer.style.display = "";

  // Display user message
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.innerText = input;
  chatContainer.appendChild(userMessage);

  userInput.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    const response = await fetch("https://backend-1-y51c.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();
    if (data.error) {
      console.error("Server Error:", data.error);
      return;
    }

    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.innerText = data.answer;
    chatContainer.appendChild(botMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;

  } catch (error) {
    console.error("Error fetching response:", error);
  }
}



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  voiceButton.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onstart = () => {
    console.log("Voice recognition started...");
    voiceButton.style.color = "red";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Transcript:", transcript);

    const chatInput = document.getElementById("userInput");
    chatInput.value = transcript;

    sendMessage(); // ⬅️ This line sends the spoken message
    voiceButton.style.color = "";
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    voiceButton.style.color = "";
  };

  recognition.onend = () => {
    console.log("Voice recognition ended.");
    voiceButton.style.color = "";
  };
} else {
  alert("Your browser does not support voice recognition.");
}





