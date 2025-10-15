const loginForm = document.getElementById("loginForm");
const uploadForm = document.getElementById("uploadForm");
const studentDashboard = document.getElementById("studentDashboard");
const facultyDashboard = document.getElementById("facultyDashboard");
const studentTable = document.querySelector("#studentTable tbody");
const facultyTable = document.querySelector("#facultyTable tbody");
const facultyFilter = document.getElementById("facultyFilter");

const studentLogout = document.getElementById("studentLogout");
const facultyLogout = document.getElementById("facultyLogout");

let assignments = []; // mock database

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;

  if (role === "student") {
    document.getElementById("studentName").textContent = email;
    studentDashboard.classList.remove("hidden");
  } else {
    document.getElementById("facultyName").textContent = email;
    facultyDashboard.classList.remove("hidden");
    renderFacultyTable();
  }

  loginForm.parentElement.classList.add("hidden");
});

// Student Upload
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const subject = document.getElementById("subjectSelect").value;
  const fileInput = document.getElementById("assignmentFile");
  const fileName = fileInput.files[0]?.name;
  const studentEmail = document.getElementById("studentName").textContent;

  if (!fileName) return alert("Please upload a file.");

  assignments.push({
    student: studentEmail,
    subject,
    file: fileName,
    marks: null,
  });

  renderStudentTable();
  alert("Assignment uploaded successfully!");
  fileInput.value = "";
});

// Render student table
function renderStudentTable() {
  const studentEmail = document.getElementById("studentName").textContent;
  studentTable.innerHTML = "";
  assignments
    .filter(a => a.student === studentEmail)
    .forEach(a => {
      const row = `
        <tr>
          <td>${a.subject}</td>
          <td>${a.file}</td>
          <td>${a.marks ? "Checked" : "Pending"}</td>
          <td>${a.marks || "-"}</td>
        </tr>`;
      studentTable.innerHTML += row;
    });
}

// Render faculty table
function renderFacultyTable() {
  facultyTable.innerHTML = "";
  const filter = facultyFilter.value;

  assignments
    .filter(a => filter === "all" || a.subject === filter)
    .forEach((a, i) => {
      facultyTable.innerHTML += `
        <tr>
          <td>${a.student}</td>
          <td>${a.subject}</td>
          <td>${a.file}</td>
          <td>${a.marks || "-"}</td>
          <td>
            <input type="number" id="marks-${i}" placeholder="Marks" min="0" max="100" />
            <button onclick="gradeAssignment(${i})">Save</button>
          </td>
        </tr>`;
    });
}

// Grade Assignment
function gradeAssignment(i) {
  const marks = document.getElementById(`marks-${i}`).value;
  if (marks === "") return alert("Enter marks first");
  assignments[i].marks = marks;
  alert("Marks saved!");
  renderFacultyTable();
}

// Filter by subject
facultyFilter.addEventListener("change", renderFacultyTable);

// Logout buttons
studentLogout.addEventListener("click", () => {
  studentDashboard.classList.add("hidden");
  loginForm.parentElement.classList.remove("hidden");
  alert("Logged out successfully!");
});

facultyLogout.addEventListener("click", () => {
  facultyDashboard.classList.add("hidden");
  loginForm.parentElement.classList.remove("hidden");
  alert("Logged out successfully!");
});
