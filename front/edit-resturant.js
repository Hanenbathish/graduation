const nameInput = document.getElementById("name");
const photoInput = document.getElementById("photo");
const phoneInput = document.getElementById("phone");
// const reigonInput = document.getElementById("regon");
// const countryInput = document.getElementById("country");
const editSubmit = document.getElementById('editSubmit');
async function getData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:7000/api/v1.0.0/resturants/mine`, {
            headers: {
                'Authorization':  `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data.doc) {
            console.log(data.doc);
            nameInput.value = data.doc[0].name;
            // imageInput.dataset.image = data.doc.image;
            photoInput.dataset.photo = data.doc.photo; // استخدم value بدلاً من photo
           phoneInput.value = data.doc[0].phone;
        } else {
            console.error('No document found in data');
        }
    } catch (error) {
        console.log('Error:', error);
    }
}
async function edit() {
    const token = localStorage.getItem('token');
    const fileInput = document.getElementById("photo");
    let pathImage = photoInput.dataset.photo;
    if (fileInput.files[0]) {
        pathImage = fileInput.files[0].name;
    }
    const updatedData = {
        name: nameInput.value,
       photo : pathImage,
        phone: phoneInput.value,
    };
    console.log(updatedData)
    try {
        const response = await fetch(`http://localhost:7000/api/v1.0.0/resturants`, {
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
        window.location.href = "My-Resturant.html";
    } catch (err) {
       
    }
}
    getData();
    editSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        edit();
    });
