const input = document.getElementById('Input');

const search = document.getElementById('search');
search.addEventListener('click', (event) => {
	event.preventDefault();
	if (input.value === '') {
		alert('please enter the symptom!');
	} else {
		let list = document.getElementById('list');
		list.textContent = '';
		fetch(`/search=${input.value}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				data.forEach((element) => {
					const li = document.createElement('li');
					li.innerText = element.name;

					li.setAttribute('class', 'list');
					li.innerText = element.name;
					list.appendChild(li);
					let count = 0;

					const descDiv = document.createElement('div');

					const description = document.createElement('p');
					const treatment = document.createElement('p');
					const symptomps = document.createElement('p');

					li.addEventListener('click', () => {
						count++;
						let diseaseId = '';
						diseaseId = element.id;

						fetch(`/treatment=${diseaseId}`)
							.then((response) => {
								return response.json();
							})
							.then((data) => {
								description.textContent = 'Description: ' + data.Description;
								treatment.textContent = ' Treatment: ' + data.Treatment;
								symptomps.textContent = 'Symptoms: ' + data.Symptoms;
							});

						descDiv.appendChild(description);
						descDiv.appendChild(treatment);
						descDiv.appendChild(symptomps);
						li.appendChild(descDiv);
						if (count % 2 === 0) {
							li.removeChild(descDiv);
						}
					});
				}); // foreach
			});
	} // else
});
