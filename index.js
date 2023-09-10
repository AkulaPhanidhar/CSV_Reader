document.getElementById('csvFile').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const rows = content.split('\n');
        const headers = rows[0].split(',');
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        for (let i = 1; i < rows.length; i++) {
            const data = rows[i].split(',');
            const row = document.createElement('tr');

            data.forEach(item => {
                const td = document.createElement('td');
                td.textContent = item;
                row.appendChild(td);
            });

            table.appendChild(row);
        }
        tableContainer.appendChild(table);
        document.getElementById('searchInput').addEventListener('input', handleSearch);
    }
    reader.readAsText(file);
}

function handleSearch() {
    const searchText = this.value.toLowerCase();
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr:not(:first-child)');

    let matchingRows = 0;

    rows.forEach(row => {
        let found = false;
        row.querySelectorAll('td').forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchText)) {
                found = true;
            }
        });

        if (found) {
            row.style.display = '';
            matchingRows++;
        } else {
            row.style.display = 'none';
        }
    });

    const resultsContainer = document.getElementById('results');
    resultsContainer.textContent = `Matching Rows : ${matchingRows}`;
}
