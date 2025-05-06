
let jobListings = document.getElementById('job-listings');
let jobCard = document.createElement('div');
const token = localStorage.getItem('token'); 

const params = new URLSearchParams(window.location.search);
const city = params.get('city');
const regon = params.get('regon');
const country = params.get('country');

fetch(`http://localhost:7000/api/v1.0.0/resturants?location[city]=${city}&location[regon]=${regon}&location[country]=${country}&active=true`, {
    method: 'GET',
    headers: {
        'Authorization':`Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(data => {
        jobListings.innerHTML = ''; // Clear previous content
        if (data.status === 'success' && data.doc.length > 0) {
         
           
            data.doc.forEach(product => {
                    const jobCard = document.createElement('div');
                    jobCard.classList.add('container2');
                    const content = `
                    <img src="../front/image/${product.photo}" alt="" class="img-fluid" />
                    <h3 class="detiles" >Name: ${product.name}</h3>
                    <p  class="detiles" >Phone: ${product.phone}</p>
                   ` ;
                    jobCard.innerHTML = content;
                    let editBtn = document.createElement('button');
                    editBtn.classList.add('see');
                    editBtn.innerHTML = 'More';
                    editBtn.addEventListener('click', () => meal(product._id));
                    jobListings.appendChild(jobCard);
                    jobCard.appendChild(editBtn);
                });
            }
        })
        function meal(productId) {
            // Redirect to the edit page and pass the postId as a query parameter
            localStorage.setItem('id',productId)
            window.location.href = `product.html?id=${productId}`;
          }