document.addEventListener('DOMContentLoaded', function() {
    const profilePics = [
        './img/Dp.jpg',
        './img/dp-1.jpg',
        './img/dp-2.jpg',
        './img/dp-3.jpg',
        './img/official.jpg'
    ];

    const commentsContainer = document.getElementById('comments-container');
    const commentInput = document.getElementById('comment-text');
    const sendButton = document.getElementById('send-comment');

    // Function to render a single comment
    function renderComment(comment) {
        const randomIndex = Math.floor(Math.random() * profilePics.length);
        const profilePic = profilePics[randomIndex];

        const timestamp = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes();

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.id = `comment-${comment.id}`; // Add id attribute to the comment div

        commentDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start; margin: 20px 0; justify-content: space-between;">
        <div style="display: flex; align-items: center;">
            <img style="width: 3vw;" src="${profilePic}" alt="Profile Picture" class="comment-profile-pic">
            <div style="margin-left: 10px;">
                <p style="margin: 0; font-size: 15px; font-weight: bolder;">${comment.user.username} <span style="font-size: 10px; font-weight: lighter;">${hours}:${minutes}</span></p>
                <p style="margin: 0; font-size: 10px; word-wrap: break-word;">${comment.body}</p>
            </div>
        </div>
        <div style="display: flex; flex-direction: row; gap:5px; align-items: flex-end;">
            <button onclick="editComment(${comment.id})"><i class="fa-solid fa-pen-to-square" style="color: #022F96;"></i></button>
            <button onclick="deleteComment(${comment.id})"><i class="fa-solid fa-trash" style="color: #022F96;"></i></button>
        </div>
    </div>
    
        `;
        
        commentsContainer.appendChild(commentDiv);
    }

    // Function to add a new comment
    // Function to add a new comment
    function addComment() {
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            fetch('https://dummyjson.com/comments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: commentText,
                    postId: 3, // Assuming postId
                    userId: 5, // Assuming userId
                })
            })
            .then(res => res.json())
            .then(data => {
                // Assuming data contains the newly added comment
                renderComment(data);
                commentInput.value = ''; // Clear the input field after adding the comment
                
                  // Display Swal notification with the added message
            Swal.fire({
                icon: "success",
                title: "Comment added Successfully!",
                html: `<p style="margin: 0;color:#022F96; font-weight:bolder; font-size: 15px; word-wrap: break-word;">${commentText}</p>`, // Display the added message in the notification
                showConfirmButton: false,
                timer: 3500
            });
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
        }
    }

    // Event listener for adding comment when send icon is clicked
    sendButton.addEventListener('click', addComment);

    // Event listener for adding comment when Enter key is pressed in the input field
    commentInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });

    // Function to edit a comment
    window.editComment = function(commentId , commentBody) {
        fetch(`https://dummyjson.com/comments/${commentId}`, {
            method: 'PUT', // or 'PATCH'
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                body: commentBody,
            })
        })
        .then(res => res.json())
        .then(data => {
            // Assuming data contains the updated comment
            // You might need to handle updating the UI if necessary
            Swal.fire({
                icon: "success",
                title: "Comment Edited Successfully!",
                html: `<p style="margin: 0;color:#022F96; font-weight:bolder; font-size: 15px; word-wrap: break-word;">${data.body}</p>`,
                showConfirmButton: false,
                timer: 3500
              });
            console.log('Comment edited:', data);
        })
        .catch(error => {
            console.error('Error editing comment:', error);
        });
    }

    // Function to delete a comment
    window.deleteComment = function(commentId) {
        let deletedMessage = ""; // Initialize deletedMessage variable
        fetch(`https://dummyjson.com/comments/${commentId}`, {
            method: 'DELETE',
        })
        .then(() => {
            // Remove the comment from the UI
            const commentDiv = document.getElementById(`comment-${commentId}`);
            if (commentDiv) {
                deletedMessage = commentDiv.innerText; // Store the deleted comment message
                commentDiv.remove();
            }
            Swal.fire({
                icon: "success",
                title: "Comment deleted Successfully!",
                html: `<p style="margin: 0;color:#022F96; font-weight:bolder; font-size: 15px; word-wrap: break-word;">${deletedMessage}</p>`,
                showConfirmButton: false,
                timer: 3500
              });
            console.log('Comment deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting comment:', error);
        });
    }

    // Fetch comments and render them
    fetch('https://dummyjson.com/comments')
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data.comments)) {
                data.comments.forEach(comment => {
                    renderComment(comment);
                });
            } else {
                console.error('Comments data not found or not in expected format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
});
