document.getElementById('studentForm').addEventListener('submit', addStudent);

function addStudent(e) {
    e.preventDefault();
    
    let studentName = document.getElementById('studentName').value;
    let studentID = document.getElementById('studentID').value;
    let email = document.getElementById('email').value;
    let contactNo = document.getElementById('contactNo').value;

    // Validation
    if (!studentName || !studentID || !email || !contactNo) {
        alert("Please fill in all fields.");
        return;
    }

    // Store data in local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ studentName, studentID, email, contactNo });
    localStorage.setItem('students', JSON.stringify(students));
    
    // Display students
    displayStudents();

    // Clear the form
    document.getElementById('studentForm').reset();
}

function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let studentTable = document.querySelector('#studentTable tbody');
    studentTable.innerHTML = '';

    students.forEach((student, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentID}</td>
            <td>${student.email}</td>
            <td>${student.contactNo}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
            </td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    let student = students[index];

    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contactNo;

    deleteStudent(index);
}

// Load students when page loads
document.addEventListener('DOMContentLoaded', displayStudents);
