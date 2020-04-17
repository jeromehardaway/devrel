

//typed JS Snippet
const typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  backSpeed: 40,
  typeSpeed: 40
});

document.getElementById('submit-btn').addEventListener('click', (event) => {
  event.preventDefault();
  let inputName = document.getElementById("name");
  let inputBranch = document.getElementById("branch");
  let inputGithub = document.getElementById("github");
  let inputWebsite = document.getElementById("website");
  let storedName = localStorage.getItem("name");
  let storedBranch = localStorage.getItem("branch");
  let storedGithub = localStorage.getItem("github");
  let storedWebsite = localStorage.getItem("website");
  let table = document.getElementById("troop-info");
  let info = {
    storedName: storedName,
    storedBranch: storedBranch,
    storedGithub: storedGithub,
    storedWebsite: storedWebsite
  }

  let row = document.createElement('tr')
  let tableDataOne = document.createElement('td')
  let tableDataTwo = document.createElement('td')
  let tableDataThree = document.createElement('td')
  let tableDataFour = document.createElement('td')
  let deleteButton = document.createElement("button");

  // button styling
  deleteButton.type = "button";
  deleteButton.className = "btn btn-primary btn-small";



  tableDataOne.innerText = info.storedName;
  tableDataTwo.innerText = info.storedBranch;
  tableDataThree.innerText = info.storedGithub;
  tableDataFour.innerText = info.storedWebsite;
  deleteButton.innerText = "Delete";


  row.appendChild(tableDataOne)
  row.appendChild(tableDataTwo)
  row.appendChild(tableDataThree)
  row.appendChild(tableDataFour)
  row.appendChild(deleteButton)
  table.appendChild(row)

  localStorage.setItem("name", inputName.value);
  localStorage.setItem("branch", inputBranch.value);
  localStorage.setItem("github", inputGithub.value);
  localStorage.setItem("website", inputWebsite.value);
  localStorage.setItem("info", JSON.stringify(info));
});

//jquery delete
$(document).on('click', 'tr', function () {
  $(this).closest('tr').remove();
  return false;
});

function downloadCSV(csv, filename) {
  let csvFile;
  let downloadLink;

  // CSV file
  csvFile = new Blob([csv], { type: "text/csv" });

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

function exportTableToCSV(filename) {
  let csv = [];
  let rows = document.querySelectorAll("table tr");

  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll("td, th");

    for (let j = 0; j < cols.length; j++)
      row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}
