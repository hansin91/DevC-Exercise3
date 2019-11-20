function generateTr(planet) {
	let tr = '<tr>';
	tr += '<td>' + planet.name + '</td>';
	tr += '<td>' + planet.diameter + '</td>';
	tr += '<td>' + planet.orbital_period + '</td>';
	tr += '<td>' + planet.population + '</td>';
	tr += '<td>' + planet.rotation_period + '</td>';
	tr += '<td>' + planet.surface_water + '</td>';
	tr += '<td>' + planet.terrain + '</td>';
	tr += '</tr>';
	return tr;
}

function generatePage(page) {
	const pageHTML = '<li class="page-item"><a style="cursor:pointer;" class="page-link">' + page + '</a></li>';
	return pageHTML;
}

$(document).ready(function() {
	fetch('https://swapi.co/api/planets')
		.then((res) => res.json())
		.then((data) => {
			const results = data.results;
			let tableContent = '';
			for (const planet of results) {
				tableContent += generateTr(planet);
			}
			$('#planet-list tbody').html(tableContent);

			const count = data.count;
			const perPage = results.length;

			const totalPage = Math.ceil(count / perPage);
			let paginationContent = '';
			for (let i = 1; i <= totalPage; i++) {
				paginationContent += generatePage(i);
			}
			$('#planet-pagination').html(paginationContent);
		})
		.catch((err) => console.log(err));

	$(document).on('click', '.page-link', function() {
		const page = $(this).text();
		fetch('https://swapi.co/api/planets?page=' + page).then((res) => res.json()).then((data) => {
			const results = data.results;
			let tableContent = '';
			for (const planet of results) {
				tableContent += generateTr(planet);
			}
			$('#planet-list tbody').html(tableContent);

			const count = data.count;
			const perPage = results.length;

			const totalPage = Math.ceil(count / perPage);
			let paginationContent = '';
			for (let i = 1; i <= totalPage; i++) {
				paginationContent += generatePage(i);
			}
			$('#planet-pagination').html(paginationContent);
		});
	});

	$('#filter').on('keyup', function() {
		const filter = $(this).val();
		fetch('https://swapi.co/api/planets?search=' + filter)
			.then((res) => res.json())
			.then((data) => {
				const results = data.results;
				let tableContent = '';
				for (const planet of results) {
					tableContent += generateTr(planet);
				}
				$('#planet-list tbody').html(tableContent);

				const count = data.count;
				const perPage = results.length;

				const totalPage = Math.ceil(count / perPage);
				let paginationContent = '';
				for (let i = 1; i <= totalPage; i++) {
					paginationContent += generatePage(i);
				}
				$('#planet-pagination').html(paginationContent);
			})
			.catch((err) => console.log(err));
	});
});
