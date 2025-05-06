let jobListings = document.getElementById('job-listings');
let jobCard = document.createElement('div');

function getdata() {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (!token) {
        console.log('No token found. Please log in first.');
        return;
    }
    fetch(`http://localhost:7000/api/v1.0.0/resturants/mine`, {
        method: 'GET',
        headers: {
            'Authorization': ` Bearer ${token} `
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.doc.length > 0) {
                data.doc.forEach(resturant => {
                    const jobCard = document.createElement('div');
                    jobCard.classList.add('product');
                    const content = `
          <img src="../front/image/${resturant.photo}" alt="" class="meal-image" />
          <h3 class="price">Name: ${resturant.name}</h3>
          <h3 class="price">Phone: ${resturant.phone}</h3>
          <h3 class="price">Location:</h3>
          <p class="price">City: ${resturant.location.city}</p>
          <p class="price">Region: ${resturant.location.regon}</p>
          <p class="price">Country: ${resturant.location.country}</p>
          `;
         console.log(resturant.phone)
                    jobCard.innerHTML = content;
                    let buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('button-container');
                    //  Create and add Edit button
                    let editBtn = document.createElement('button');
                    editBtn.innerHTML = 'Edit';
                    editBtn.classList.add('details-btn');
                    editBtn.addEventListener('click', () => editproduct(resturant._id));
                    //  Create and add Delete button
                    buttonContainer.appendChild(editBtn);
                    // Append button container to job card
                    jobCard.appendChild(buttonContainer);
                    jobListings.appendChild(jobCard);
                });
            } else {
                jobListings.innerHTML = 'No data available';
            }
        })
        .catch(err => console.log(err));
}
getdata();
function editproduct(resturantId) {
    // Redirect to the edit page and pass the postId as a query parameter
    localStorage.setItem('id', resturantId)
    window.location.href = `edit-resturant.html?id=${resturantId}`;
}
