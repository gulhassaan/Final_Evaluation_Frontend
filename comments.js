class CommentManager {
    constructor() {
        this.profilePics = [
            './img/Dp.jpg',
            './img/dp-1.jpg',
            './img/dp-2.jpg',
            './img/dp-3.jpg',
            './img/official.jpg'
        ];
        this.commentsContainer = document.getElementById('comments-container');
        this.commentInput = document.getElementById('comment-text');
        this.sendButton = document.getElementById('send-comment');

        this.sendButton.addEventListener('click', this.addComment.bind(this));
        this.commentInput.addEventListener('keypress', this.handleKeyPress.bind(this));
    }

    renderComment(comment) {
        const randomIndex = Math.floor(Math.random() * this.profilePics.length);
        const profilePic = this.profilePics[randomIndex];

        const timestamp = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes(); 

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.id = `comment-${comment.id}`;

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
                    <button style="cursor:pointer;" onclick="commentManager.editComment(${comment.id}, '${comment.body}')"><i class="fa-solid fa-pen-to-square" style="color: #022F96;"></i></button>
                    <button style="cursor:pointer;" onclick="commentManager.deleteComment(${comment.id})"><i class="fa-solid fa-trash" style="color: #022F96;"></i></button>
                </div>
            </div>
        `;

        this.commentsContainer.appendChild(commentDiv);
    }

    addComment() {
        const commentText = this.commentInput.value.trim();
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
                this.renderComment(data);
                this.commentInput.value = '';
                Swal.fire({
                    icon: "success",
                    title: "Comment added Successfully!",
                    html: `<p style="margin: 0;color:#022F96; font-weight:bolder; font-size: 15px; word-wrap: break-word;">${commentText}</p>`,
                    showConfirmButton: false,
                    timer: 3500
                });
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
        }
    }

    editComment(commentId, commentBody) {
        fetch(`https://dummyjson.com/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                body: commentBody,
            })
        })
        .then(res => res.json())
        .then(data => {
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

    deleteComment(commentId) {
        let deletedMessage = "";
        fetch(`https://dummyjson.com/comments/${commentId}`, {
            method: 'DELETE',
        })
        .then(() => {
            const commentDiv = document.getElementById(`comment-${commentId}`);
            if (commentDiv) {
                deletedMessage = commentDiv.innerText;
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

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.addComment();
        }
    }

    fetchAndRenderComments() {
        fetch('https://dummyjson.com/comments')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.comments)) {
                    data.comments.forEach(comment => {
                        this.renderComment(comment);
                    });
                } else {
                    console.error('Comments data not found or not in expected format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate the CommentManager class and call the fetchAndRenderComments method
    const commentManager = new CommentManager();
    commentManager.fetchAndRenderComments();
     // Define commentManager in the global scope
     window.commentManager = commentManager;
});
