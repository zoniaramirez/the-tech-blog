//Sign up submission
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("success");
  // If successful, redirect the browser to the dashboard page
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);