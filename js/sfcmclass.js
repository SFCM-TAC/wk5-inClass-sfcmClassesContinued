/* Object Creation - Constructor Notation */
function SFCMClass(code, name, room, capacity, teacher, students) {
  // properties
  this.code = code;
  this.name = name;
  this.room = room;
  this.capacity = capacity;
  this.teacher = teacher;
  this.students = students || [];
  // methods
  this.getClassTitle = function() {
    return this.code + ": " + this.name;
  };
  this.addStudent = function(name) {
    // TODO: add name to list of students
    this.students.push(name);

    // update the UI
    renderClasses();
  };
  this.dropStudent = function(name) {
    // TODO: remove name from list of students

    var indexToRemove;
    for(i=0; i < this.students.length; i++) {
      if (this.students[i] == name) {
        indexToRemove = i;
        break;
      }
    }

    this.students.splice(indexToRemove, 1);
    // update the UI
    renderClasses();
  };
  this.isStudentInClass = function(name) {
    return this.students.includes(name);
  },
  this.renderClass = function(parent) {
    /* Displays the class info on the page by dynamically creating HTML elements */

    // create a new element to render the class inside
    var classContainerEl = document.createElement('div');
    classContainerEl.id = this.code;
    classContainerEl.className = 'sfcmClass';
    parent.appendChild(classContainerEl);

    // render basic class info
    var infoEl = document.createElement('div')
    var info = document.createTextNode(this.getClassTitle() + " (" + this.teacher + ")");
    infoEl.appendChild(info);
    infoEl.className = 'classInfo';
    classContainerEl.appendChild(infoEl);

    // render class list
    var listEl = document.createElement('div')
    for (var i = 0; i < this.students.length; i++) {
      console.log('here');
      var studentEl = document.createElement('div');
      var student = document.createTextNode(this.students[i]);
      studentEl.appendChild(student);
      studentEl.className = 'classStudent';
      listEl.appendChild(studentEl);
    }
    listEl.className = 'classList';
    classContainerEl.appendChild(listEl);
  }
}

/* Objects intialized using the SFCMClass constructor */
allClasses = [];
var tac300 = new SFCMClass('TAC300', 'Intro to Computer Science', '507', 15, 'Emily Pitts', [
  'Kevin Becker', 'Eliza Carrington', 'Stan Chiang',
  'Ziyi Fu', 'Kris Grant', 'Qianqian Jin', 'Jared Le Doux',
  'Frank Lin', 'Jana Ma', 'Cole Masaitis', 'Alex Perkins',
  'Teddy Raven', 'Charlie Sehres', 'Calvin Smith', 'Thomas Soto',
]);
allClasses.push(tac300);
var tac120 = new SFCMClass('TAC120', 'Production Techniques in Logic Pro', '512', 20, 'Mary-Clare Bryztwa', [
  'Jared Le Doux', 'Teddy Raven', 'Cole Masaitis', 'Ziyi Fu',
]);
allClasses.push(tac120);


/* Rendering Logic */
function renderClasses() {
  parentEl = document.getElementById('classes');
  parentEl.innerHTML = '';

  for (var i = 0; i < allClasses.length; i++) {
    allClasses[i].renderClass(parentEl);
  }
}
document.addEventListener("DOMContentLoaded", renderClasses);

/* Search/Filtering Logic */
function handleSearchInput(event) {
  var search = event.target.value;
  var students = document.querySelectorAll('.classStudent');

  for (i = 0; i < students.length; i++) {
    var currentStudentNode = students[i];
    var studentName = currentStudentNode.innerHTML;
    if (studentName.startsWith(search)) {
      currentStudentNode.setAttribute('class', 'classStudent highlighted');
    } else {
      currentStudentNode.setAttribute('class', 'classStudent');
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // attaches the handleSearchInput to the search box
  // so that when it changes, we can do something with its value
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("change", handleSearchInput);
});
