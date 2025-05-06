//document.getElementById("product-search").addEventListener("input", getdata);

//function getdata() {
 // const jobListings = document.getElementById("job-listings");
 // const token = localStorage.getItem("token"); 
 // const searchQuery = document.getElementById("product-search").value.trim(); 

 // if (!token) {
  //  console.log("No token found. Please log in first.");
  //  jobListings.innerHTML = "Please log in to search for jobs.";
   // return;
 // }

  //fetch(`http://localhost:7000/api/v1.0.0/products?search=${(searchQuery)}`,
  //  {
   //   method: "GET",
   //   headers: {
    //    Authorization: `Bearer ${token}`,
    //  },
   // }
 // )
   // .then((res) => {
    //  if (!res.ok) {
    //    throw new Error(`HTTP error! status: ${res.status}`);
    //  }
     // return res.json();
    //})
    //.then((data) => {
     // jobListings.innerHTML = ""; 
     // if (data.status === "success" && data.doc.length > 0) {
      //  data.doc.forEach(product => {
       //     const jobCard = document.createElement('div');
       //     jobCard.classList.add('product');
        //    const content = `
         //   <img src="../front/image/${product.image}" alt="" class="meal-image" />
            
         //   <h3 class="meal-title">${product.title}</h3>
          //  <p class="price">price: ${product.price}</p>
          //  <p class="catgory">category: ${product.category}</p>
          //  <p class="Description">Description: ${product.description}</p>
           // `;
           // jobCard.innerHTML = content;
           // let buttonContainer = document.createElement('div');
           // buttonContainer.classList.add('button-container');
            
            // Create and add Edit button
           // let editBtn = document.createElement('button');
           // editBtn.innerHTML = 'Edit';
           // editBtn.classList.add('details-btn');
           // editBtn.addEventListener('click', () => editproduct(product._id));
            
            // Create and add Delete button
           // let deleteBtn = document.createElement('button');
           // deleteBtn.innerHTML = 'Delete';
           // deleteBtn.classList.add('delete-btn');
            // Pass post ID and token
           // let icon = document.createElement("i");
           // icon.classList.add("fa-solid", "fa-shopping-cart");
           // icon.addEventListener('click', () => showIcon(product._id));
           // deleteBtn.addEventListener('click', () => deleteJob(product._id)); 
           // async function deleteJob(id){
           //   const token = localStorage.getItem('token'); 
                 // try {
                 //     fetch(`http://localhost:7000/api/v1.0.0/products/${id}`,{
                  //        method:'DELETE',
                    //      headers: {
                   //           'Content-Type': 'application/json',
                   //           'Authorization': `Bearer ${token}`
                    //      },
                    //  }).then(() => {
                      
                      //    window.location.reload(); 
                    //  }) 
                //  } catch (error) {
                    // console.log(error.message) 
               //   }
             // }
              
              // Append buttons to button container
            //  buttonContainer.appendChild(editBtn);
             // buttonContainer.appendChild(deleteBtn);
             // buttonContainer.appendChild(icon);
              
              // Append button container to job card
              //jobCard.appendChild(buttonContainer);
              
             // jobListings.appendChild(jobCard);
              
              
         // });

         

      //  } else {
       //     jobListings.innerHTML = 'No data available';
       // }
   // })
   // .catch(err => console.log(err));
//}
//getdata();
  