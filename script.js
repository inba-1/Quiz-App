const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "jQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which tag defines a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "What is the correct syntax for external script?",
    options: ["<script href='x.js'>", "<script src='x.js'>", "<script ref='x.js'>", "<script link='x.js'>"],
    answer: "<script src='x.js'>"
  },
  {
    question: "Which property changes background color?",
    options: ["color", "background-color", "bgcolor", "bg-color"],
    answer: "background-color"
  }
];

let currentIndex = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');
const sidebar = document.getElementById('sidebar');

function initSidebar() {
  sidebar.innerHTML = "";
  questions.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.textContent = index + 1;
    btn.onclick = () => {
      currentIndex = index;
      showQuestion(currentIndex);
    };
    btn.id = `sidebar-btn-${index}`;
    sidebar.appendChild(btn);
  });
}

function updateSidebar() {
  questions.forEach((_, index) => {
    const btn = document.getElementById(`sidebar-btn-${index}`);
    if (selectedAnswers[index] !== null) {
      btn.classList.add("answered");
    } else {
      btn.classList.remove("answered");
    }
  });
}

function updateProgressBar() {
  const percent = ((currentIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function showQuestion(index) {
  const q = questions[index];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = option;

    if (selectedAnswers[index] !== null) {
      const selected = selectedAnswers[index];
      if (option === q.answer) btn.classList.add("correct");
      if (option === selected && selected !== q.answer) btn.classList.add("incorrect");
    }

    btn.onclick = () => selectAnswer(btn, q.answer, option);
    optionsEl.appendChild(btn);
  });

  updateSidebar();
  updateProgressBar();
}

function selectAnswer(selected, correct, chosen) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => {
    opt.onclick = null;
    if (opt.textContent === correct) opt.classList.add("correct");
    if (opt === selected && chosen !== correct) opt.classList.add("incorrect");
  });

  if (selectedAnswers[currentIndex] === null && chosen === correct) {
    score++;
  } else if (selectedAnswers[currentIndex] !== null && selectedAnswers[currentIndex] !== correct && chosen === correct) {
    score++;
  } else if (selectedAnswers[currentIndex] === correct && chosen !== correct) {
    score--;
  }

  selectedAnswers[currentIndex] = chosen;
  updateSidebar();
}

nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion(currentIndex);
  } else {
    let correctCount = 0;
    selectedAnswers.forEach((ans, i) => {
      if (ans === questions[i].answer) correctCount++;
    });
    alert(`You got ${correctCount} out of ${questions.length} correct.`);
    location.reload(); // restart
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion(currentIndex);
  }
};

initSidebar();
showQuestion(currentIndex);
