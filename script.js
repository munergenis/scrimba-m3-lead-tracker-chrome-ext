const inpEl = document.querySelector("#inp-el")
const inpBtn = document.querySelector("#inp-btn")
const tabBtn = document.querySelector("#tab-btn")
const delBtn = document.querySelector("#del-btn")
const ulEl = document.querySelector("#ul-el")

let leads = getLocalStorage()
renderUl()

inpBtn.addEventListener("click", () => { saveInput() })
tabBtn.addEventListener("click", () => { saveTab() })
delBtn.addEventListener("dblclick", () => { clearLeads() })

function saveInput() {
  let lead = inpEl.value
  inpEl.value = ""
  leads.push(lead)
  addLiEl(lead)
  updateLocalStorage()
}

function saveTab() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    leads.push(url)
    addLiEl(url)
    updateLocalStorage()
  })
}

function clearLeads() {
  clearLocalStorage()
  leads = []
  renderUl()
}

function addLiEl(lead) {
  ulEl.innerHTML += `
    <li><a target="_blank" href="${lead}">${lead}</a></li>
  `
}

function renderUl() {
  let leadsList = ""
  leads.forEach(lead => {
    leadsList += `
      <li><a target="_blank" href="${lead}">${lead}</a></li>
    `
  });
  ulEl.innerHTML = leadsList
}

// Local storage
function updateLocalStorage() {
  localStorage.setItem("leads", JSON.stringify(leads))
}

function getLocalStorage() {
  if (localStorage.getItem("leads")){
    return JSON.parse(localStorage.getItem("leads"))
  } else {
    return []
  }
}

function clearLocalStorage() {
  localStorage.clear()
}