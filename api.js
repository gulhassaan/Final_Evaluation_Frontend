

  fetch('https://dummyjson.com/posts')
  .then(response => response.json())
  .then(postData => {
    const posts = postData.posts;

    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(userData => {
        const users = userData.users;

        const postList = document.getElementById('post-list');

        // Loop through posts
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
                    src="${post.imageUrl ? post.imageUrl : './img/post2.png'}" alt="Post Image">
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
                        <span style="color: black; font-weight: bold;">Genre: </span> #${post.tags}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div id="contentContainer" style="max-height: 7vh; overflow: hidden;">
                    <p id="content" style="color: #CFCFD4; font-weight: 400; margin:0px 10px; font-size:0.7rem">
                      ${post.body ? post.body : 'No description provided.'}
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
                          style="font-weight: bolder; font-size:15px;">${user.firstName}</p></div>
                      <div style="display: flex;">
                        <div id="companyName">
                          <p
                            style="color: #B8B8BF; font-size:12px;">${user.company.title} <span
                              style="color: #CFCFD4;">at</span></p>
                        </div>
                        
                        <div id="paypal-img">
                          <img style="height: 17px;"
                            src="./img/paypal.png" />
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
      })
      .catch(error => console.error('Error fetching users:', error));
  })
  .catch(error => console.error('Error fetching posts:', error));


// Fetching only user Data
fetch('https://dummyjson.com/users')
  .then(response => response.json())
  .then(userData => {
    const users = userData.users;
    const userList = document.getElementById('user-list');

    users.forEach((user, index) => {
      const userHtml = `
        <div class="profile">
          <div class="profile-photo">
            <img src="${user.image}">
          </div>
          <div class="handle">
            <h2>${user.firstName}</h2>
          </div>
          ${index % 2 === 0 ? '<i class="fa-solid fa-circle" style="color: #01F4F7"></i>' : '<h6 style="font-size:0.7rem;  color: rgb(171, 171, 171);">Active 5 min ago </h6>'}
        </div>
      `;
      userList.innerHTML += userHtml;
    });
    
    
  })
  .catch(error => console.error('Error fetching user data:', error));


    function showMore() {
        var contentContainer = document.getElementById('contentContainer');
        var content = document.getElementById('content');
        var btn = document.getElementById('showMoreBtn');

        if (contentContainer.style.maxHeight !== 'none') {
            contentContainer.style.maxHeight = 'none';
            content.style.overflow = 'visible';
            btn.innerText = 'Show Less';
        } else {
            contentContainer.style.maxHeight = '10vh';
            content.style.overflow = 'hidden';
            btn.innerText = 'Show More';
        }
    }


    