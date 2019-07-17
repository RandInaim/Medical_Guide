const input = document.getElementById("Input");
const inputValue = input;

const search = document.getElementById("search");
search.addEventListener("click", event => {
  event.preventDefault();
  fetch(`/search=${inputValue.value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("gshjaf", data);

      let list = document.getElementById("list");
      for (let i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        li.innerText = data[i];
        list.appendChild(li);
      }
    });
});
