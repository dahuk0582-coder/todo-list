let currentFilter = "all";

// 오늘 날짜를 헤더 배지에 표시
function renderTodayDate() {
  let badge = document.querySelector("#todayDate");
  if (!badge) {
    return;
  }

  let now = new Date();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let days = ["일", "월", "화", "수", "목", "금", "토"];
  let dayName = days[now.getDay()];

  badge.textContent = month + "월 " + date + "일 (" + dayName + ") 일정";
}

// 전체 / 완료 개수 갱신
function updateCount() {
  let allItems = document.querySelectorAll("#todoList li");
  let completedItems = document.querySelectorAll("#todoList li.completed");

  let total = allItems.length;
  let completed = completedItems.length;

  document.querySelector("#todoCount").textContent =
    "전체 " + total + "개 / 완료 " + completed + "개";
}

// 선택한 필터(전체 / 진행중 / 완료)에 따라 목록 표시
function applyFilter() {
  let items = document.querySelectorAll("#todoList li");

  for (let i = 0; i < items.length; i++) {
    let isCompleted = items[i].classList.contains("completed");

    if (currentFilter === "all") {
      items[i].style.display = "flex";
    } else if (currentFilter === "active") {
      items[i].style.display = isCompleted ? "none" : "flex";
    } else if (currentFilter === "completed") {
      items[i].style.display = isCompleted ? "flex" : "none";
    }
  }
}

// 각 할 일 항목(li)에 완료 토글과 삭제 버튼 연결
function setupTodoItem(liElement, text) {
  liElement.textContent = "";
  liElement.classList.add("todo-item");

  let span = document.createElement("span");
  span.classList.add("todo-text");
  span.textContent = text;

  span.addEventListener("click", function () {
    liElement.classList.toggle("completed");
    updateCount();
    applyFilter();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "삭제";

  deleteBtn.addEventListener("click", function () {
    liElement.remove();
    updateCount();
  });

  liElement.append(span, deleteBtn);
}

// 할 일 추가
function addTodo() {
  let input = document.querySelector("#todoInput");
  let text = input.value.trim();

  if (text === "") {
    alert("할 일을 입력하세요.");
    return;
  }

  let newItem = document.createElement("li");
  setupTodoItem(newItem, text);

  document.querySelector("#todoList").append(newItem);

  input.value = "";
  updateCount();
  applyFilter();
}

// Enter 키로도 추가 가능하게 설정
let todoInput = document.querySelector("#todoInput");
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// 필터 버튼 클릭 이벤트 연결
let filterButtons = document.querySelectorAll(".filter-btn");
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    filterButtons[i].classList.add("active");
    currentFilter = filterButtons[i].dataset.filter;
    applyFilter();
  });
}

// 초기 항목 세팅
let initialItems = document.querySelectorAll("#todoList li");
for (let i = 0; i < initialItems.length; i++) {
  let currentText = initialItems[i].textContent;
  setupTodoItem(initialItems[i], currentText);
}

renderTodayDate();
updateCount();
applyFilter();