document.addEventListener("DOMContentLoaded", () => {
  async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();
    const id = window.location.toString().split("/").pop();

    console.log("Title:", title);
    console.log("Content:", content);
    console.log("ID:", id);

    if (title && content) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            post_id: id,
            title,
            content,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // If successful, redirect the browser to the dashboard page
        if (response.ok) {
          document.location.replace("/dashboard/");
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to update post.");
      }
    } else {
      alert("Title and content cannot be empty.");
    }
  }

  document.querySelector("#edit-post-form").addEventListener("submit", editFormHandler);

  console.log("Event listener attached to #edit-post-form");
});