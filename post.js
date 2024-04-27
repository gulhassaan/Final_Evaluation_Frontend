document.addEventListener("DOMContentLoaded", function() {
  const addPostBtn = document.getElementById("addPostBtn");
  const postFormContainer = document.getElementById("postFormContainer");
  const overlay = document.getElementById("overlay");
  
  addPostBtn.addEventListener("click", function() {
    postFormContainer.style.display = "block"; // Show the form container
    overlay.style.display = "block"; // Show the overlay
  });
  
  overlay.addEventListener("click", function() {
    postFormContainer.style.display = "none"; // Hide the form container
    overlay.style.display = "none"; // Hide the overlay
  });
  
  document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const userId = parseInt(document.getElementById("userId").value);
  
    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        userId: userId
        /* other post data */
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add post. User not found.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Handle the response from the API
      createPostCard(data); // Call function to create card with the response data
      savePostData(data); // Save post data to localStorage
      postFormContainer.style.display = "none"; // Hide the form container
      overlay.style.display = "none"; // Hide the overlay
    })
    .catch(error => {
      console.error('Error:', error.message);
      // Display user-friendly error message, e.g., show an alert
      alert('Failed to add post. User not found.');
    });
  });
});

// Function to create post card
function createPostCard(postData) {
  const postContainer = document.getElementById("postContainer");

  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.textContent = postData.title;

  const userId = document.createElement('p');
  userId.textContent = `User ID: ${postData.userId}`;

  card.appendChild(title);
  card.appendChild(userId);

  postContainer.appendChild(card);
}

// Function to save post data to localStorage
function savePostData(postData) {
  // Get existing post data from localStorage or initialize an empty array
  let existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

  // Add the new post data to the array
  existingPosts.push(postData);

  // Save the updated array back to localStorage
  localStorage.setItem('posts', JSON.stringify(existingPosts));
}
