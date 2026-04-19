function initStudyApp(studyData) {
  const storageKey = "study-app-" + (studyData.storageKey || "default");
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".panel");

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      tabs.forEach((tab) => tab.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  document.title = studyData.pageTitle || studyData.unit;
  document.getElementById("eyebrow").textContent = studyData.subject;
  document.getElementById("appTitle").textContent = studyData.unit;
  document.getElementById("appDescription").textContent = studyData.description;
  document.getElementById("footerNote").textContent = studyData.footer;

  const heroMeta = document.getElementById("heroMeta");
  studyData.meta.forEach((item) => {
    const chip = document.createElement("div");
    chip.className = "hero-chip";
    chip.textContent = item;
    heroMeta.appendChild(chip);
  });

  const pointWrap = document.getElementById("summaryPoints");
  studyData.summaryPoints.forEach((item) => {
    const point = document.createElement("section");
    point.className = "point";
    point.innerHTML = "<strong>" + item.title + "</strong><div>" + item.body + "</div>";
    pointWrap.appendChild(point);
  });
  document.getElementById("pointCount").textContent = studyData.summaryPoints.length + "ポイント";

  const timelineWrap = document.getElementById("timeline");
  studyData.timeline.forEach((item) => {
    const row = document.createElement("div");
    row.className = "timeline-item";
    row.innerHTML = '<div class="year">' + item.year + "</div><div>" + item.event + "</div>";
    timelineWrap.appendChild(row);
  });

  const termWrap = document.getElementById("terms");
  studyData.terms.forEach((item) => {
    const card = document.createElement("article");
    card.className = "term";
    card.innerHTML = "<h3>" + item.word + "</h3><p>" + item.meaning + "</p>";
    termWrap.appendChild(card);
  });

  const flashGrid = document.getElementById("flashGrid");
  studyData.flashcards.forEach((card) => {
    const el = document.createElement("div");
    el.className = "flashcard";
    el.innerHTML =
      '<button type="button" aria-label="暗記カードをめくる">' +
      '<div class="flash-inner">' +
      '<div class="flash-face flash-front">' +
      '<span class="flash-label">QUESTION</span>' +
      '<div class="flash-text">' + card.front + "</div>" +
      '<div class="flash-tip">タップして答えを見る</div>' +
      "</div>" +
      '<div class="flash-face flash-back">' +
      '<span class="flash-label">ANSWER</span>' +
      '<div class="flash-text">' + card.back + "</div>" +
      '<div class="flash-tip">もう一度タップで戻る</div>' +
      "</div>" +
      "</div>" +
      "</button>";
    el.addEventListener("click", () => {
      el.classList.toggle("flipped");
    });
    flashGrid.appendChild(el);
  });
  document.getElementById("flashCount").textContent = studyData.flashcards.length + "枚";

  const checklist = document.getElementById("checklist");
  const storedChecks = JSON.parse(localStorage.getItem(storageKey) || "[]");

  function updateCompletion() {
    const checkedCount = storedChecks.filter(Boolean).length;
    const rate = studyData.checkItems.length === 0 ? 0 : Math.round((checkedCount / studyData.checkItems.length) * 100);
    document.getElementById("completionRate").textContent = "達成度 " + rate + "%";
  }

  function renderChecklist() {
    checklist.innerHTML = "";
    studyData.checkItems.forEach((item, index) => {
      const checked = Boolean(storedChecks[index]);
      const label = document.createElement("label");
      label.className = "check-item";
      label.innerHTML =
        '<input type="checkbox" ' + (checked ? "checked" : "") + ' data-index="' + index + '">' +
        '<span class="check-text">' +
        '<span class="check-title">' + item.title + "</span>" +
        '<span class="check-note">' + item.note + "</span>" +
        "</span>";
      checklist.appendChild(label);
    });
    updateCompletion();
  }

  checklist.addEventListener("change", (event) => {
    if (event.target.matches("input[type='checkbox']")) {
      const index = Number(event.target.dataset.index);
      storedChecks[index] = event.target.checked;
      localStorage.setItem(storageKey, JSON.stringify(storedChecks));
      updateCompletion();
    }
  });

  renderChecklist();

  let currentQuiz = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function renderQuestion() {
    const current = currentQuiz[currentIndex];
    document.getElementById("progress").textContent = "第" + (currentIndex + 1) + "問 / " + currentQuiz.length + "  正解 " + score;
    document.getElementById("question").textContent = current.question;
    document.getElementById("result").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    answered = false;

    const choices = document.getElementById("choices");
    choices.innerHTML = "";

    current.choices.forEach((choiceText, choiceIndex) => {
      const button = document.createElement("button");
      button.className = "choice";
      button.textContent = choiceText;
      button.addEventListener("click", () => answerQuestion(choiceIndex));
      choices.appendChild(button);
    });
  }

  function answerQuestion(selectedIndex) {
    if (answered) {
      return;
    }

    answered = true;
    const current = currentQuiz[currentIndex];
    const buttons = [...document.querySelectorAll(".choice")];
    buttons.forEach((button, index) => {
      if (index === current.answerIndex) {
        button.classList.add("correct");
      } else if (index === selectedIndex) {
        button.classList.add("incorrect");
      }
    });

    if (selectedIndex === current.answerIndex) {
      score += 1;
    }

    const result = document.getElementById("result");
    result.style.display = "block";
    if (selectedIndex === current.answerIndex) {
      result.innerHTML = "<strong>正解</strong><div>" + current.explanation + "</div>";
    } else {
      result.innerHTML = "<strong>おしい</strong><div>正解は「" + current.choices[current.answerIndex] + "」です。" + current.explanation + "</div>";
    }

    const nextButton = document.getElementById("nextBtn");
    nextButton.style.display = "inline-flex";
    nextButton.textContent = currentIndex === currentQuiz.length - 1 ? "結果を見る" : "次の問題";
    document.getElementById("progress").textContent = "第" + (currentIndex + 1) + "問 / " + currentQuiz.length + "  正解 " + score;
  }

  function showFinal() {
    document.getElementById("progress").textContent = "終了";
    document.getElementById("question").innerHTML =
      "おつかれさまです。<br><span class=\"score-box\">" + currentQuiz.length + "問中 " + score + "問正解</span>";
    document.getElementById("choices").innerHTML = "";

    let message = "要点と暗記カードを見直して、もう一回やってみましょう。";
    if (score === currentQuiz.length) {
      message = "全問正解です。このまま本番に向かえます。";
    } else if (score >= Math.ceil(currentQuiz.length * 0.75)) {
      message = "かなり仕上がっています。迷った問題だけ復習するとさらに安心です。";
    } else if (score >= Math.ceil(currentQuiz.length * 0.5)) {
      message = "あと少しです。要点のつながりを確認すると伸びます。";
    }

    const result = document.getElementById("result");
    result.style.display = "block";
    result.innerHTML = message;
    document.getElementById("nextBtn").style.display = "none";
  }

  function resetQuiz() {
    currentQuiz = shuffle(studyData.quiz);
    currentIndex = 0;
    score = 0;
    answered = false;
    renderQuestion();
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex < currentQuiz.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showFinal();
    }
  });

  document.getElementById("restartBtn").addEventListener("click", resetQuiz);
  resetQuiz();
}
