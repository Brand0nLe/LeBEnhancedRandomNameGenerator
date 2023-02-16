// Get references to HTML elements
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const addNameButton = document.getElementById('addNameButtonForm');
const deleteNameButton = document.getElementById('deleteNameButton');
const groupSizeInput = document.getElementById('groupSizeInput');
const groupNumberInput = document.getElementById('groupNumberInput');
const generateGroupButton = document.getElementById('generateGroupButton');
const results = document.getElementById('results');

// Initialize the list of names from local storage, if it exists
let names = JSON.parse(localStorage.getItem('names')) || [];

// Function to add a name to the list
function addName() {
  const name = nameInput.value.trim();
  if (name !== '' && !names.includes(name)) {
    names.push(name);
    const option = document.createElement('option');
    option.text = name;
    option.value = name;
    nameList.add(option);
    localStorage.setItem('names', JSON.stringify(names));
  }
  nameInput.value = '';
}

// Function to delete a name from the list
function deleteName() {
  const selectedOption = nameList.options[nameList.selectedIndex];
  const name = selectedOption.value;
  names = names.filter(n => n !== name);
  nameList.remove(nameList.selectedIndex);
  localStorage.setItem('names', JSON.stringify(names));
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Function to generate groups
  function generateGroups() {
    const groupSize = Number(groupSizeInput.value);
    const groupNumber = Number(groupNumberInput.value);
    const totalPeople = names.length;
    const totalGroups = Math.ceil(totalPeople / groupSize);
    const groupCounts = new Array(totalGroups).fill(groupSize);
    let personCount = 0;
    const groups = [];
  
    // Shuffle the names array
    shuffleArray(names);
  
    for (let i = 0; i < totalGroups; i++) {
      const group = [];
      for (let j = 0; j < groupCounts[i]; j++) {
        if (personCount < totalPeople) {
          group.push(names[personCount]);
          personCount++;
        }
      }
      if (group.length > 0) {
        groups.push({ groupNumber: i + 1, names: group });
      }
    }
    const output = groups
      .map(
        group =>
          `<div class="group">Group ${group.groupNumber}: ${group.names.join(
            ', '
          )}</div>`
      )
      .join('');
    results.innerHTML = output;
    saveGroups(groups);
  }
  
  
// Add event listeners
addNameButton.addEventListener('click', addName);
deleteNameButton.addEventListener('click', deleteName);
generateGroupButton.addEventListener('click', generateGroups);

// Populate the list of names from the names array
names.forEach(name => {
  const option = document.createElement('option');
  option.text = name;
  option.value = name;
  nameList.add(option);
});

// Retrieve groups from local storage and display them
function loadGroups() {
    let groups = JSON.parse(localStorage.getItem('groups'));
    if (groups) {
      let output = '';
      groups.forEach(group => {
        output += `<div class="group">Group ${group.groupNumber}: ${group.names.join(', ')}</div>`;
      });
      results.innerHTML = output;
    }
  }
  
  // Save the generated groups to local storage
  function saveGroups(groups) {
    localStorage.setItem('groups', JSON.stringify(groups));
  }
  
  
  // Call loadGroups on page load
  window.addEventListener("load", loadGroups);