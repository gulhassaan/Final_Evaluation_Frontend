fetch("https://dummyjson.com/posts")
  .then((response) => response.json())
  .then((postData) => {
    let posts = postData.posts.slice(0, 10); // Take only the first ten posts initially

    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((userData) => {
        const users = userData.users;

        const postList = document.getElementById("post-list");

        function renderPosts(posts) {
          posts.forEach((post, index) => {
            // Get the user index for the current post
            const userIndex = index % users.length;
            const user = users[userIndex];

            const cardHtml = `
          <div style="margin-top: 3rem;">
            <div class="card"
              style="border-radius:20px; width: 100%; height:fit-content;   background-color: white; box-shadow: 0 0 10px 0 rgb(220, 220, 220); gap: 20px; margin: 0 auto;">
              <div class="card-data" style="display: grid; grid-template-columns: 40% 60%;">
              <div style="border-radius: 20px; overflow: hidden;">
                  <img class="card-img-top"
                    style="padding: 10px; height: 100%; width: 100%; aspect-ratio: 1/1; border-radius: 20px;"
                    src="${
                      post.imageUrl ? post.imageUrl : "../img/post2.png"
                    }" alt="Post Image">
                </div>
                <div class="card-parent">
                  <div id="newcard" class="div card-step-1" style="display: flex;  padding: 10px; gap: 1rem;">
                    <div class="div price">
                      <p style="background-color: #01F4F7; padding: 30px 10px; border-radius: 20px; color: #022e96b6; max-width: 7vw; font-size: 25px; text-align: center; font-weight: 800;">
                   MAY 08
                      </p>
                    </div>
                    <div class="div heading" style="display: flex; flex-direction: column;">
                      <div class="div heading-main">
                        <p style="font-size: 20px; font-weight: bolder;">
                          ${post.title}
                        </p>
                      </div>
                      <div class="div heading-para">
                        <h5 class="card-title" style="color: #B8B8BF; font-weight: bold; margin-top: 1rem;">
                        <span style="color: black; font-weight: bold;">Genre: </span> #${
                          post.tags
                        }
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div id="contentContainer" style="max-height: 7vh; overflow: hidden;">
                    <p id="content" style="color: #CFCFD4; font-weight: 400; margin:0px 10px; font-size:0.7rem">
                      ${post.body ? post.body : "No description provided."}
                    </p>
                  </div>
                  <button id="showMoreBtn" style="background-color:white; margin-right:10px; float:right; color:black;" onclick="showMore()">Show More</button>
                  <!--Horizontal Line-->
                  <hr>
                  <!--Horizontal Line End-->

                  <!--Profile and designation-->
                  <div id="bottom-section" class="card-bottom"
                    style="display: flex; flex-direction: row; gap: 10px; margin: 5px;">
                    <div id="userimage" style="width: 7%; height: 7%;"><img
                        src="${user.image}"
                        style="border-radius: 50%;  aspect-ratio: 1/1;" /></div>
                    <div
                      style="display: flex; flex-direction: column;">
                      <div id="firstname"><p
                          style="font-weight: bolder; font-size:15px;">${
                            user.firstName
                          }</p></div>
                      <div style="display: flex;">
                        <div id="companyName">
                          <p
                            style="color: #B8B8BF; font-size:12px;">${
                              user.company.title
                            } <span
                              style="color: #CFCFD4;">at</span></p>
                        </div>
                        
                        <div id="paypal-img">
                          <img style="height: 17px;"
                            src="../img/paypal.png" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--Profile and designation End-->

                  <!--Comment and Like,Share section-->
                  <div id="comment"
                    style="display: flex; align-items: center; text-align: center; gap: 200px; margin-left: 5px;">


                    <!--Comments Button-->
                    <div 
                      style="display: flex; background-color: #022f96; width: fit-content; padding: 2px; border-radius: 20px; margin-top: 0px; text-align: center; align-items: center; gap: .2rem;">
                      <div><p
                          style="background-color:#01F4F7; color: #022f96; border-radius: 50%; padding: 7px; font-size: 11px; font-weight: bolder; margin: 0px;">73</p></div>
                      <div><p
                          style="color: white !important; font-size:10px; font-weight: bolder; padding-right: .3rem;">Comments</p></div>
                    </div>
                    <!--Comments Button End-->


                    <!--Like and Share Button-->

                    <div style="float: inline-end; ">
                      <i
                        style="animation: fireAnimation 2s infinite alternate; color: #ff0000;"
                        class="bi bi-fire"></i>
                      ${post.reactions}
                      <i class="fa-solid fa-share"
                        style="color: rgb(0, 208, 255);"></i>
                      12
                    </div>

                    <!--Like and Share Button End-->
                  </div>
                  <!-- Add additional sections as needed -->
                </div>
              </div>
              <!--Comment Div-->






              <div style="display:flex; background-color: #AAE1FC; border-radius: 0px 0px 15px 15px">
              <div style=" display:flex; justify-content:space-between; align-item:center; margin-left:10px; ">
                  <input id="comment-input-${post.id}" class="comment-input" placeholder="😊 Add Comment..." required style="padding: 10px; border: 1px solid #F0EFEF; margin-bottom:0px; border-radius: 5px; width:125%; background-color: #AAE1FC"/>
                  <button class="add-comment-btn" onclick="postComment(${post.id })" style="padding: 8px 15px; background-color: transparent; color: #022F96; border: none; border-radius: 5px; cursor: pointer;">
                      <i class="fas fa-paper-plane "></i>
                  </button>
              </div>
              <div id="appendComment-${post.id}" style="margin-top: 0px; margin-left: 60px; display: flex; flex-direction: column;  padding: 10px; border-radius: 5px;">
                  <!-- New comments will be appended here -->
              </div>
          </div>
          
          
          






              <!--<div style="display: flex;">
              <div class="comment-input-container">
                <input class="comment-input" placeholder="Add your comment..." required></input>
                <button class="add-comment-btn" onclick="postComment()">Post Comment</button>
              </div>

              <div class="comments-section">
                <!-- Comments will be displayed here -->
              </div>
            
            </div>
              
              <!--Comment Div End-->
             
            </div>



           
          
          
          
            </div>
          `;
            postList.innerHTML += cardHtml;
          });
        }

        function loadMorePosts() {
          const nextPosts = postData.posts.slice(
            posts.length,
            posts.length + 10
          );
          if (nextPosts.length > 0) {
            posts = [...posts, ...nextPosts];
            renderPosts(nextPosts);
            addShowMoreButton(); // Add the "Show More" button after loading more posts
          } else {
            showMoreBtn.style.display = "none"; // Hide the button if there are no more posts
          }
        }

        renderPosts(posts);

        const showMoreBtn = document.createElement("button");

        showMoreBtn.addEventListener("click", loadMorePosts);

        postList.appendChild(showMoreBtn);

        function addShowMoreButton() {
          const moreButtonContainer = document.createElement("div");
          moreButtonContainer.classList.add("more-button-container");
          moreButtonContainer.style.marginTop = "20px"; // Adjust margin as needed

          const moreButton = document.createElement("button");
          moreButton.textContent = "Show More";
          moreButton.classList.add("show-more-button");
          moreButton.style.color = "black";
          moreButton.style.backgroundColor = "#F0EFEF";
          moreButton.style.padding = "10px 200px";
          moreButton.style.borderRadius = "20px";
          moreButton.style.border = "1px solid black";
          moreButton.style.cursor = "pointer";
          moreButton.style.marginLeft = "auto";
          moreButton.style.marginRight = "auto";
          moreButton.style.display = "block";
          moreButton.style.marginBottom = "20px";

          moreButton.addEventListener("click", loadMorePosts);
          document.body.appendChild(moreButtonContainer);
          moreButtonContainer.appendChild(showMoreBtn);
          moreButtonContainer.appendChild(moreButton);
          postList.appendChild(moreButtonContainer);
        }

        addShowMoreButton();
      })
      .catch((error) => console.error("Error fetching users:", error));
  })
  .catch((error) => console.error("Error fetching posts:", error));

// Fetching only user Data
fetch("https://dummyjson.com/users")
  .then((response) => response.json())
  .then((userData) => {
    const users = userData.users;
    const userList = document.getElementById("user-list");

    users.forEach((user, index) => {
      const userHtml = `
        <div class="profile">
          <div class="profile-photo">
            <img src="${user.image}">
          </div>
          <div class="handle">
            <h2>${user.firstName}</h2>
          </div>
          ${
            index % 2 === 0
              ? '<i class="fa-solid fa-circle" style="color: #01F4F7"></i>'
              : '<h6 style="font-size:0.7rem;  color: rgb(171, 171, 171);">Active 5 min ago </h6>'
          }
        </div>
      `;
      userList.innerHTML += userHtml;
    });
  })
  .catch((error) => console.error("Error fetching user data:", error));

function showMore() {
  var contentContainer = document.getElementById("contentContainer");
  var content = document.getElementById("content");
  var btn = document.getElementById("showMoreBtn");

  if (contentContainer.style.maxHeight !== "none") {
    contentContainer.style.maxHeight = "none";
    content.style.overflow = "visible";
    btn.innerText = "Show Less";
  } else {
    contentContainer.style.maxHeight = "10vh";
    content.style.overflow = "hidden";
    btn.innerText = "Show More";
  }
}

// Function to perform Comments in Posts

function postComment(postId) {
  // Get the comment text from the input field
  let commentInput = document.getElementById(`comment-input-${postId}`);
  let commentText = commentInput.value.trim(); // Trim whitespace

  // Check if the comment is not empty
  if (commentText === "") {
    // Use Swal alert for better user experience
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a comment , Its empty!",
    });
    return; // Exit the function if comment is empty
  }

  // Get user data from local storage
  const userProfile = localStorage.getItem("UserProfile");
  const userFirstName = localStorage.getItem("FirstName");

  // Fetch data from API (dummy endpoint used for example)
  fetch("https://dummyjson.com/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: commentText,
      postId: postId, // Using the passed postId parameter
      userId: 5,
    }),
  })
    .then((res) => res.json())
    .then((addCustomeCommet) => {
      // Create a new comment element container with flex properties
      let newCommentContainer = document.createElement("div");
      newCommentContainer.style.display = "flex";
      newCommentContainer.style.alignItems = "center";
      newCommentContainer.style.marginBottom = "10px"; 

      // Create a new comment element
      let commentContainer = document.getElementById(`appendComment-${postId}`);
      let newComment = document.createElement("div");
      newComment.style.paddingLeft = "10px"; 
      newCommentContainer.style.display = "flex";

      newComment.style.flexGrow = "1";

      // Dynamically generate comment numbering
      let commentNumber = commentContainer.children.length + 1;

      // Set the content of the new comment element
      newComment.innerHTML = `
      <div style="display: flex; justify-content:center; align-items: center; margin-bottom: 10px;">
      <div style="padding-left: 10px; display: flex; ">
        <img src="${userProfile}" alt="Profile Image" style="width: 20px; height: 20px; border-radius: 50%; margin-right: 10px;">
        <span>${userFirstName} - ${commentNumber} : ${commentText}</span>
      </div>
      <div style="display: inline-block;">
      <button class="edit-comment-btn" style="mix-blend-mode: multiply;" onclick="editComment(${addCustomeCommet.id}, '${commentText}')"><i class="fa-regular fa-pen-to-square"></i></button>
      <button class="delete-comment-btn" style="mix-blend-mode: multiply;" onclick="deleteComment(${addCustomeCommet.id}, ${postId})"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    </div>
    
    `;
    
    

      // Append the new comment element to the comment container
      newCommentContainer.appendChild(newComment);
      
      // Append the new comment container to the comment container
      commentContainer.appendChild(newCommentContainer);

      // Clear the comment input field after successful posting
      commentInput.value = "";

      // Show success message using Swal
      Swal.fire({
        icon: "success",
        title: "Comment added successfully!",
        text: `Comment: "${commentText}"`,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editComment(commentId, currentText) {
  // Use Swal input to allow editing the comment
  Swal.fire({
    title: "Edit Comment",
    input: "text",
    inputValue: currentText,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value.trim()) {
        return "Please enter a non-empty comment!";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Fetch data from API to update the comment
      fetch(`https://dummyjson.com/comments/${commentId}`, {
        method: "PUT", //
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: result.value,
        }),
      })
        .then((res) => res.json())
        .then((updatedComment) => {
          // Update the displayed comment with the new body
          let commentElement = document.querySelector(
            `#appendComment-${updatedComment.postId} div[data-comment-id="${updatedComment.id}"]`
          );
          if (commentElement) {
            commentElement.querySelector("span").textContent =
              updatedComment.body;
          }
          Swal.fire({
            icon: "success",
            title: "Comment updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Api hitted and comments edit....");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}

function deleteComment(commentId, postId) {
  // Confirm with the user before deleting the comment
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Fetch data from API to delete the comment
      fetch(`https://dummyjson.com/comments/${commentId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((deletedComment) => {
          // Remove the deleted comment element from the UI
          let commentElement = document.querySelector(
            `#appendComment-${postId} div[data-comment-id="${deletedComment.id}"]`
          );
          if (commentElement) {
            commentElement.remove();
          }
          Swal.fire({
            icon: "success",
            title: "Comment deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Api hitted and comments deleted....");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}
