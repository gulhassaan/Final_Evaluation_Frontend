window.onload = function() {
    const token = localStorage.getItem('token');
    console.log("Token : " , token)
    if (!token) {
        // Token is not present, redirect to index.html
        window.location.href = "../index.html";
    } else {
        // Make a request to get the current authenticated user
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                // If the request fails, redirect to index.html
                window.location.href = "../index.html";

            } else {
                // If the request is successful, stay on socialmedia.html
                console.log('User is authenticated');
            }
        })
        .catch(error => {
            console.error('Error fetching current user:', error);
            // If there's an error, redirect to index.html
            window.location.href = "../index.html";

        });
    }
};
