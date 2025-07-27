document.getElementById("shorten").addEventListener("click", async function() {
    const longUrl = document.getElementById("longurl").value;
    if (!longUrl) {
        alert("Please enter a URL!");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ longUrl: longUrl })
        });
        const data = await response.json();
        if (data.shortUrl) {
            document.getElementById("shorturl").value = data.shortUrl;
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Something went wrong: " + error);
    }
});
