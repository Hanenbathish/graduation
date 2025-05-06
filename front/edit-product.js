
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");

const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const editSubmit = document.getElementById('editSubmit');
async function getData() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    try {
        const response = await fetch(`http://localhost:7000/api/v1.0.0/products/${id}`, {
            headers: {
                'Authorization': ` Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error`(HTTP error! status: ${response.status})`;
        }
        const data = await response.json();
        console.log(data);
        imageInput.dataset.image = data.doc.image;
        titleInput.value = data.doc.title;
        descriptionInput.value = data.doc.description;
        priceInput.value = data.doc.price;
        categoryInput.value = data.doc.category;
    } catch (error) {
        console.log('Error:', error);
    }
}
async function edit() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const fileInput = document.getElementById("image");
    let pathImage = imageInput.dataset.image
    if (fileInput.files[0]) {
        pathImage = fileInput.files[0].name;
    }
    const updatedData = {
        title: titleInput.value,
        description: descriptionInput.value,
        image: pathImage,
        price: priceInput.value,
        category: categoryInput.value,
    };
    console.log(updatedData)
    try {
        const response = await fetch(`http://localhost:7000/api/v1.0.0/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Data updated successfully');
        window.location.href = "./dashbord-mgr.html";
    } catch (error) {
        console.log('Error:', error);
    }
};
getData();
editSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    edit();
});