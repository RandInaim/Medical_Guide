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
        li.innerText = data[i].name;

        li.setAttribute("class", "list");
        li.innerText = data[i].name;
        list.appendChild(li);
        let count = 0;
        li.addEventListener("click", () => {
          console.log("count", count);
          count++;
          let diseaseId = "";
          //   console.log("li", li);
          //   if (data[i].name === li.inn) {
          diseaseId = data[i].id;
          //   console.log(diseaseId);
          //   }
          fetch(`/treatment=${diseaseId}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              //   console.log("secondAPI", data);
              const description = document.createElement("p");
              description.textContent = "";
              description.setAttribute("class", "description");
              description.textContent =
                "Description: " +
                data.Description +
                "\n Treatment: " +
                data.Treatment +
                "\n Symptoms: " +
                data.Symptoms;
              if (count % 2 != 0) {
                li.appendChild(description);
              } else {
                console.log("hi");
                console.log("the list is", li);
                li.removeChild(description);
              }
            });
        });
      }
    });
});
