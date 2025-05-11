let jobListings = document.getElementById('job-listings');
let jobCard = document.createElement('div');



function getdata(searchTerm = '') {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (!token) {
        console.log('No token found. Please log in first.');
        return;
    }

    fetch('http://localhost:7000/api/v1.0.0/products/my', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        jobListings.innerHTML = ''; // Clear previous content
        if (data.status === 'success' && data.doc.length > 0) {
            data.doc.forEach(product => {
                if (!searchTerm || product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
                    const jobCard = document.createElement('div');
                    jobCard.classList.add('product');
                    const content = `
                    <img src="../front/image/${product.image}" alt="" class="meal-image" />
                    <h3 class="meal-title">${product.title}</h3>
                    <p class="price">price: $ ${product.price}</p>
                    <p class="catgory">category: ${product.category}</p>
                    <p class="Description">Description: ${product.description}</p>
                   ` ;
                    jobCard.innerHTML = content;
                    let buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('button-container');

                    let editBtn = document.createElement('button');
                    editBtn.innerHTML = 'Edit';
                    editBtn.classList.add('details-btn');
                    editBtn.addEventListener('click', () => editproduct(product._id));

                    let deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = 'Delete';
                    deleteBtn.classList.add('delete-btn');

                    let icon = document.createElement("i");
                    icon.classList.add("fa-solid", "fa-shopping-cart");
                    icon.addEventListener('click', () => showIcon(product._id));
                    deleteBtn.addEventListener('click', () => deleteJob(product._id)); 
                    
                    async function deleteJob(id){
                        const token = localStorage.getItem('token'); 
                        try {
                            fetch(`http://localhost:7000/api/v1.0.0/products/${id}`,{
                                method:'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                            }).then(() => {
                                window.location.reload(); 
                            }) 
                        } catch (error) {
                            console.log(error.message) 
                        }
                    }

                    buttonContainer.appendChild(editBtn);
                    buttonContainer.appendChild(deleteBtn);
                    buttonContainer.appendChild(icon);
                    
                    jobCard.appendChild(buttonContainer);
                    
                    jobListings.appendChild(jobCard);
                }
            });
        } else {
            jobListings.innerHTML = 'No products available';
        }
    })
    .catch(err => console.log(err));
}

document.getElementById('categorySearch').addEventListener('input', function() {
    const searchTerm = this.value;
    getdata(searchTerm); // Pass the search term to the function
});

// Call the function on page load to fetch all products
getdata();
function editproduct(productId) {
    // Redirect to the edit page and pass the postId as a query parameter
    localStorage.setItem('id',productId)
    window.location.href = `edit-product.html?id=${productId}`;
  }
function showIcon(productId) {
    // Redirect to the edit page and pass the postId as a query parameter
    window.location.href = `showUser.html?id=${productId}`;
}
