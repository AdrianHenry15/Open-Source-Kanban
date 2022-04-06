async function deleteFormHandler(event) {
    event.preventDefault();

    // get post id from url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // delete post with async func
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // if delete is a success, redirect to dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
        // if not ok, display error
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#delete-post-btn').addEventListener('click', deleteFormHandler);