const form = document.getElementById("employeeForm");
const popup = document.getElementById("popup");
const popupInfo = document.getElementById("popupInfo");

const nameError = document.getElementById("nameError");
const idError = document.getElementById("idError");
const deptError = document.getElementById("deptError");
const reasonError = document.getElementById("reasonError");


const empName = document.getElementById("empName");
const empId = document.getElementById("empId");
const dept = document.getElementById("dept");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const reason = document.getElementById("reason");


let today = new Date().toISOString().split("T")[0];
fromDate.setAttribute("min", today);
toDate.setAttribute("min", today);

// Enable next field only when current is valid
function enableNext(current, next, regex, errorField, errorMsg) {
  current.addEventListener("input", function() {
    if (!regex.test(current.value)) {
      errorField.textContent = errorMsg;
      next.disabled = true;
    } else {
      errorField.textContent = "";
      next.disabled = false;
    }
  });
}

enableNext(empName, empId, /^[A-Za-z ]+$/, nameError, "Name should contain alphabets only.");
enableNext(empId, dept, /^[0-9]+$/, idError, "Employee ID must be numbers only.");
enableNext(dept, fromDate, /^[A-Za-z ]+$/, deptError, "Department should contain alphabets only.");

fromDate.addEventListener("change", function() {
  if (fromDate.value) {
    toDate.disabled = false;
    toDate.setAttribute("min", fromDate.value);
  } else {
    toDate.disabled = true;
  }
});

toDate.addEventListener("change", function() {
  if (toDate.value) {
    reason.disabled = false;
  } else {
    reason.disabled = true;
  }
});

// Submit form
form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Check all mandatory
  if (!empName.value || !empId.value || !dept.value || !fromDate.value || !toDate.value || !reason.value) {
    alert("All fields are mandatory. Please fill in every detail.");
    return;
  }

  // Extra validation: ToDate >= FromDate
  if (toDate.value < fromDate.value) {
    alert("To Date cannot be earlier than From Date.");
    return;
  }

  // Show popup with info
  popupInfo.innerHTML = `
    <strong>Employee Name:</strong> ${empName.value} <br>
    <strong>Employee ID:</strong> ${empId.value} <br>
    <strong>Department:</strong> ${dept.value} <br>
    <strong>From Date:</strong> ${fromDate.value} <br>
    <strong>To Date:</strong> ${toDate.value} <br>
    <strong>Reason:</strong> ${reason.value}
  `;
  popup.style.display = "flex";
});

function closePopup() {
  popup.style.display = "none";
}
