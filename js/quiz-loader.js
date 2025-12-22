// 🔹 Results screen - திருத்தப்பட்ட செயல்பாடு
function showResults() {
    // தவறான விடைகளை மட்டும் பிரித்தெடுக்க
    const wrongAnswers = quizData.filter(q => q.userChoice !== q.shuffledCorrectIndex);
    const viewWrongBtn = document.getElementById("view-wrong-btn");
    
    // தவறுகள் இருந்தால் பட்டனை காட்டவும்
    if (wrongAnswers.length > 0) {
        if (viewWrongBtn) {
            viewWrongBtn.style.display = "inline-block";
            
            viewWrongBtn.onclick = () => {
                const modal = document.getElementById("wrong-answers-modal");
                const listContainer = document.getElementById("wrong-answers-list");
                const closeBtn = document.getElementById("close-modal");

                listContainer.innerHTML = ""; // பழைய பட்டியலை அழிக்க

                wrongAnswers.forEach((q, i) => {
                    const item = document.createElement("div");
                    item.style.marginBottom = "20px";
                    item.style.padding = "15px";
                    item.style.borderBottom = "1px solid #f0f0f0";
                    item.style.background = "#fffaf0";
                    item.style.borderRadius = "8px";

                    const userAns = q.userChoice !== undefined 
                        ? (typeof q.shuffledOptions[q.userChoice] === 'string' ? q.shuffledOptions[q.userChoice] : q.shuffledOptions[q.userChoice].text)
                        : "பதிலளிக்கவில்லை";

                    const correctAns = typeof q.shuffledOptions[q.shuffledCorrectIndex] === 'string' 
                        ? q.shuffledOptions[q.shuffledCorrectIndex] 
                        : q.shuffledOptions[q.shuffledCorrectIndex].text;

                    item.innerHTML = `
                        <p style="margin: 5px 0;"><strong>${i + 1}. கேள்வி:</strong> ${q.question}</p>
                        <p style="margin: 5px 0; color: #dc3545;"><strong>உங்கள் விடை:</strong> ${userAns}</p>
                        <p style="margin: 5px 0; color: #28a745;"><strong>சரியான விடை:</strong> ${correctAns}</p>
                        <p style="margin: 10px 0 5px 0; font-size: 0.9rem; font-style: italic; color: #555;"><strong>விளக்கம்:</strong> ${q.explanation || "விளக்கம் ஏதுமில்லை"}</p>
                    `;
                    listContainer.appendChild(item);
                });

                modal.style.display = "flex";
                
                // Modal மூடும் செயல்பாடுகள்
                closeBtn.onclick = () => modal.style.display = "none";
                window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
            };
        }
    } else {
        if (viewWrongBtn) viewWrongBtn.style.display = "none";
    }

    // ஏற்கனவே இருக்கும் மற்ற செயல்பாடுகள்
    if (typeof showCustomResults === 'function') {
        showCustomResults(score, quizData.length, currentQuizTitle);
    } else {
        resultsEl.style.display = "block";
        resultsEl.innerHTML = `<h3>மதிப்பெண்: ${score} / ${quizData.length}</h3>`;
    }
}
