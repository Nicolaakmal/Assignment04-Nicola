document.addEventListener('DOMContentLoaded', function() {
    const countryInput = document.getElementById('input-country');
    const getDataButton = document.getElementById('button-addon2');

    getDataButton.addEventListener('click', function() {
        const country = countryInput.value;
        const url = `https://covid-193.p.rapidapi.com/statistics?country=${encodeURIComponent(country)}`;
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        };

        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if(data && data.response && data.response.length > 0) {
                const stats = data.response[0];

                document.getElementById('activeCases').innerHTML = stats.cases.active || 'N/A';
                document.getElementById('newCases').innerHTML = stats.cases.new ? `+${stats.cases.new}` : 'N/A';
                document.getElementById('recoveredCases').innerHTML = stats.cases.recovered || 'N/A';
                document.getElementById('totalCases').innerHTML = stats.cases.total || 'N/A';
                document.getElementById('totalDeaths').innerHTML = stats.deaths.total || 'N/A';
                document.getElementById('totalTests').innerHTML = stats.tests.total || 'N/A';
            } else {
                alert('Tidak ada data yang tersedia untuk Country yang Anda pilih.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Gagal untuk fetch data. Silakan cek nama country dan coba cari kembali.');
        });
    });
});
