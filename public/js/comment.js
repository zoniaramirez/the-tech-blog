// function to add comment
document.addEventListener("DOMContentLoaded", () => {
  async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document
      .querySelector('textarea[name="comment-body"]')
      .value.trim();

    const post_id = window.location.toString().split("/").pop();

    if (comment_text) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          post_id,
          comment_text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }

  async function deleteCommentHandler(event) {
    if (event.target.classList.contains("delete-comment-btn")) {
      const commentId = event.target.closest(".comment").dataset.commentId;

      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }

  function showEditForm(event) {
    if (event.target.classList.contains("edit-comment-btn")) {
      const commentElement = event.target.closest(".comment");
      const commentId = commentElement.dataset.commentId;
      const commentText = commentElement.querySelector("p").innerText;

      commentElement.innerHTML = `
        <textarea class="edit-comment-textarea">${commentText}</textarea>
        <button class="save-comment-btn">Save</button>
        <button class="cancel-edit-btn">Cancel</button>
      `;

      commentElement.querySelector(".save-comment-btn").addEventListener("click", async () => {
        const updatedCommentText = commentElement.querySelector(".edit-comment-textarea").value.trim();

        if (updatedCommentText) {
          const response = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            body: JSON.stringify({
              comment_text: updatedCommentText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            document.location.reload();
          } else {
            alert(response.statusText);
          }
        }
      });

      commentElement.querySelector(".cancel-edit-btn").addEventListener("click", () => {
        document.location.reload();
      });
    }
  }

  document
    .querySelector("#comment-form")
    .addEventListener("submit", commentFormHandler);

  document
    .querySelector(".comments-section")
    .addEventListener("click", deleteCommentHandler);

  document
    .querySelector(".comments-section")
    .addEventListener("click", showEditForm);
});