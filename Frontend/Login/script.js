async function loginUser(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Clear previous error message

    // API URL
    const apiURL = "http://127.0.0.1:8000/api/login/";

    try {
        // Send POST request to login API
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        // Check if the login was successful
        if (response.ok) {
            const data = await response.json();
            alert("User logged in successfully")
            // Check for token or success indicator in response (assuming `token` field here)
            if (data.token) {
                alert("Login successful!");
                // Store token in local storage or cookies for future use
                localStorage.setItem("authToken", data.token);
                // Redirect to the admin page
                window.location.href = "/Frontend/admin/admin.html"; // Absolute path
            } else {
                errorMessage.textContent = "Login failed. Please try again.";
            }
        } else {
            // Handle error response
            const errorData = await response.json();
            errorMessage.textContent = errorData.detail || "Invalid email or password.";
        }
    } catch (error) {
        console.error("Error:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
    }

    return false;
}
