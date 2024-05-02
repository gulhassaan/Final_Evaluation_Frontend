document.addEventListener("DOMContentLoaded", function () {
    const postContainer = document.getElementById("postContainer");
    
    // Simulated logged-in user ID
    const UserID =  localStorage.getItem("UserID");
    const loggedInUserId = parseInt(UserID); // Change this to the actual logged-in user ID
  
    // Function to fetch users and their posts
    function fetchUsersAndPosts() {
      fetch(`https://dummyjson.com/users`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          return response.json();
        })
        .then((data) => {
          const users = data.users; // Declare 'users' variable with const
          let user = users;
          console.log(user);
  
          // Find the logged-in user
          const loggedInUser = users.find((user) => user.id === loggedInUserId);
  
          if (!loggedInUser) {
            console.error("Logged-in user not found");
            return;
          }
  
          // Fetch posts for the logged-in user
          fetch(`https://dummyjson.com/posts/user/${loggedInUserId}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch posts for user ${loggedInUserId}`);
              }
              return res.json();
            })
            .then((allPosts) => {
              // console.log(allPosts);
  
              const posts = allPosts.posts;
  
              // console.log(posts);
  
              // Display posts only for the logged-in user
              posts.forEach((post) => {
                const postCard = document.createElement("div");
                postCard.classList.add("card", "mb-3", "p-3", "post-card");
                postCard.innerHTML = `
                <div style="margin-top: 3rem;">
                    <div class="card" style="border-radius:20px; width: 100%; height:fit-content; background-color: white; box-shadow: 0 0 10px 0 rgb(220, 220, 220); gap: 20px; margin: 0 auto;">
                        <div class="card-data" style="display: grid; grid-template-columns: 40% 60%;">
                            <div style="border-radius: 20px; overflow: hidden;">
                                <img class="card-img-top" style="padding: 10px; height: 100%; width: 100%; aspect-ratio: 1/1; border-radius: 20px;" src="${post.imageUrl ? post.imageUrl : "../img/post2.png"}" alt="Post Image">
                            </div>
                            <div class="card-parent">
                                <div id="newcard" class="div card-step-1" style="display: flex; padding: 10px; gap: 1rem;">
                                    <div class="div price">
                                    <p style="background-color: #01F4F7; padding: 30px 10px; border-radius: 20px; color: #022e96b6; max-width: 7vw; font-size: 25px; text-align: center; font-weight: 800;"> MAY 08</p>

                                    </div>
                                    <div class="div heading" style="display: flex; flex-direction: column;">
                                        <div class="div heading-main">
                                            <p style="font-size: 20px; font-weight: bolder;">${post.title}</p>
                                        </div>
                                        <div class="div heading-para">
                                            <h5 class="card-title" style="color: #B8B8BF; font-weight: bold; margin-top: 1rem;"><span style="color: black; font-weight: bold;">Genre: </span> #${post.tags}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div id="contentContainer" style="max-height: 15vh; overflow: hidden;">
                                    <p id="content" style="color: #CFCFD4; font-weight: 400; margin:0px 10px; font-size:0.7rem">${post.body ? post.body : "No description provided."}</p>
                                </div>
                                <hr>
                                <div id="bottom-section" class="card-bottom" style="display: flex; flex-direction: row; gap: 10px; margin: 15px;">
                                    <div id="userimage" style="width: 7%; height: 7%;"><img src="${loggedInUser.image}" style="border-radius: 50%; aspect-ratio: 1/1;" /></div>
                                    <div style="display: flex; flex-direction: column;">
                                        <div id="firstname"><p style="font-weight: bolder; font-size:15px;">${loggedInUser.firstName}</p></div>
                                        <div style="display: flex;">
                                            <div id="companyName">
                                                <p style="color: #B8B8BF; font-size:12px;">${loggedInUser.company.title} <span style="color: #CFCFD4;">at</span></p>
                                            </div>
                                            <div id="paypal-img">
                                                <img style="height: 17px;" src="../img/paypal.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="comment" style="display: flex; align-items: center; text-align: center; gap: 200px; margin: 15px;">
                                   
                                <div style="float: inline-end; ">
                                <i
                                  style="animation: fireAnimation 2s infinite alternate; color: #ff0000;"
                                  class="bi bi-fire"></i>
                                  
                                ${post.reactions}
                                <i class="fa-solid fa-share"
                                  style="color: rgb(0, 208, 255);"></i>
                                12
                              </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            `;
            
            
  
                postContainer.appendChild(postCard);
  
                
              });
            })
            .catch((error) => {
              console.error(error.message);
            });
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  
    // Invoke the function to fetch users and their posts
    fetchUsersAndPosts();
  });