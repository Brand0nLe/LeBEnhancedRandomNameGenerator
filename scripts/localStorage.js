// export function saveData(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
//   }
  
//   export function loadData(key) {
//     const data = localStorage.getItem(key);
//     if (data === null) {
//       return null;
//     } else {
//       return JSON.parse(data);
//     }
//   }
  
//   export function deleteData(key, value) {
//     const data = loadData(key);
//     if (data !== null) {
//       const index = data.indexOf(value);
//       if (index !== -1) {
//         data.splice(index, 1);
//         saveData(key, data);
//       }
//     }
//     return data;
//   }
  
//   export function clearData(key) {
//     localStorage.removeItem(key);
//   }

// Retrieve names from local storage
function getNames() {
    let names = JSON.parse(localStorage.getItem("names"));
    if (!names) {
      names = [];
    }
    return names;
  }
  
// Add a name to local storage and update groups
function addName(name) {
    let names = getNames();
    names.push(name);
    localStorage.setItem("names", JSON.stringify(names));
    
    // Update groups
    let groupHtml = generateGroups();
    saveGroups(groupHtml);
  }
  
  // Remove a name from local storage and update groups
  function removeName(name) {
    let names = getNames();
    const index = names.indexOf(name);
    if (index > -1) {
      names.splice(index, 1);
      localStorage.setItem("names", JSON.stringify(names));
    }
  
    // Update groups
    let groupHtml = generateGroups();
    saveGroups(groupHtml);
  }
  
  // Clear all names from local storage
  function clearNames() {
    localStorage.removeItem("names");
  }