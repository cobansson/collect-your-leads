let myTabs = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const saveBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

const fetchDataFromStorage = JSON.parse(localStorage.getItem("myTabs"));

if (fetchDataFromStorage) {
    myTabs = fetchDataFromStorage;
    render(myTabs);
}

function render(tabs) {
    let inputText = "";

    for (let i = 0; i < tabs.length; i++) {
        inputText += `<li><a target="_blank" href="${tabs[i]}">${tabs[i]}</li>`;
    }
    ulEl.innerHTML = inputText;
}

inputBtn.addEventListener("click", function() {
    myTabs.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    render(myTabs);
})

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myTabs.push(tabs[0].url);
        localStorage.setItem("myTabs", JSON.stringify(myTabs));
        render(myTabs);
    })
})

deleteBtn.addEventListener("dblclick", function() {
    myTabs = [];
    localStorage.clear();
    render(myTabs);
})
