document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const pincode = document.getElementById('pincode').value;

    const postalApiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(postalApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data[0].Status === "Success") {
                showPopup(data[0].PostOffice);
            } else {
                alert('Invalid pincode.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while validating the pincode.');
        });
});

function showPopup(postOffices) {
    const popup = document.getElementById('popup');
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = '';
    postOffices.forEach(office => {
        const listItem = document.createElement('li');
        listItem.textContent = `${office.Name}, ${office.Block}, ${office.District}, ${office.State}`;
        placesList.appendChild(listItem);
    });

    popup.style.display = 'block';
    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        popup.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
}
