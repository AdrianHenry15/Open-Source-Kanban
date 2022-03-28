async function newFormHandler(event) {
    event.preventDefault();

    // get post title and text from form
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('input[name="post-text"]').value;

    // use post route to add post
    // user id added from session info 
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // if response is ok, reload page showing the newest post in users post list
    if (response.ok) {
        document.location.replace('/dashboard');
        // if not okay display error
    } else {
        alert(response.statusText);
    }
}

// new post submit button
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);