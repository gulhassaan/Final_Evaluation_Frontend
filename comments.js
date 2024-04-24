// Array of profile picture URLs

document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code goes here
    const profilePics = [
        './img/Dp.jpg',
    './img/dp-1.jpg',
    './img/dp-2.jpg',
    './img/dp-3.jpg',
    './img/official.jpg'
    ];

    // Select the comments container element
    const commentsContainer = document.getElementById('comments-container');

    fetch('https://dummyjson.com/comments')
        .then(response => response.json())
        .then(data => {
            // Check if the 'comments' key exists in the object
            if (data && Array.isArray(data.comments)) {
                // 'comments' key exists and is an array, iterate over comments
                data.comments.forEach(comment => {
                    const randomIndex = Math.floor(Math.random() * profilePics.length);
                    const profilePic = profilePics[randomIndex];

                    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
                    const hours = timestamp.getHours();
                    const minutes = timestamp.getMinutes();
                    

                    // Create a new div element for each comment
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');

                    // Generate HTML markup for the comment
                    commentDiv.innerHTML = `
                    <div style="display: flex; align-items: flex-start; margin: 20px 0;">
                        <div style="flex: 0 0 auto;">
                            <img style="width: 3vw;" src="${profilePic}" alt="Profile Picture" class="comment-profile-pic">
                        </div>
                        <div style="margin-left: 10px;">
                            <div style="display: flex; flex-direction: column;">
                                <p style="margin: 0; font-size: 15px; font-weight: bolder;">${comment.user.username} <span style="font-size: 10px; font-weight: lighter;">${hours}:${minutes}</span></p>
                                <p style="margin: 0; font-size: 10px; word-wrap: break-word;">${comment.body}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                

                    // Append the comment div to the comments container
                    commentsContainer.appendChild(commentDiv);
                });
            } else {
                // 'comments' key is missing or not an array
                console.error('Comments data not found or not in expected format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
});








