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
				console.log('gshjaf', data);

				for (let i = 0; i < data.length; i++) {
					const li = document.createElement('li');
					li.innerText = data[i].name;

					li.setAttribute('class', 'list');
					li.innerText = data[i].name;
					list.appendChild(li);
					let count = 0;

					const descDiv = document.createElement('div');

					const description = document.createElement('p');
					const treatment = document.createElement('p');
					const symptomps = document.createElement('p');

					li.addEventListener('click', () => {
						console.log('count', count);
						count++;
						let diseaseId = '';
						diseaseId = data[i].id;

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
				}
			});
	} /// else
});
