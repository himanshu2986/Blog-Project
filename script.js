// script.js
// This file adds interactivity to the blog:
// 1. Handles comment submissions.
// 2. Filters posts when the user types in the search bar.

/* ============
   Comments
   ============ */

// Run code after the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select all comment forms on the page
    const commentForms = document.querySelectorAll(".comment-form");

    // Add submit listener to each form
    commentForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop normal form submission / page reload

            // Get references to the name and message fields inside this form
            const nameInput = form.querySelector(".comment-name");
            const messageInput = form.querySelector(".comment-message");

            const name = nameInput.value.trim() || "Anonymous";
            const message = messageInput.value.trim();

            // Simple validation: do not allow empty comments
            if (message === "") {
                alert("Please write a comment before submitting.");
                return;
            }

            // Find the list where comments for this post are displayed
            const list = form.closest(".comments").querySelector(".comment-list");

            // Create a new list item for the comment
            const li = document.createElement("li");
            li.classList.add("comment");

            // Add current date and time for the comment
            const now = new Date();
            const dateString = now.toLocaleString(); // e.g., "10/12/2025, 8:15:30 pm"

            // Build the inner HTML for the comment
            li.innerHTML =
                '<p class="comment-meta"><strong>' +
                escapeHtml(name) +
                "</strong> • " +
                dateString +
                "</p>" +
                "<p>" +
                escapeHtml(message) +
                "</p>";

            // Add the comment at the top of the list
            list.prepend(li);

            // Clear the form
            form.reset();
        });
    });

    /* ============
       Search Bar
       ============ */

    const searchInput = document.getElementById("search-input");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const term = searchInput.value.toLowerCase();

            // Select all posts
            const posts = document.querySelectorAll(".post");

            posts.forEach(function (post) {
                const title = post
                    .querySelector(".post-title")
                    .textContent.toLowerCase();
                const content = post
                    .querySelector(".post-content")
                    .textContent.toLowerCase();

                // If the search term appears in the title or text, show the post
                const matches =
                    title.includes(term) || content.includes(term);

                post.style.display = matches ? "" : "none";
            });
        });
    }
});

/**
 * escapeHtml
 * Small helper function that prevents HTML code inside comments
 * from being interpreted as real HTML.
 */
function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
}
