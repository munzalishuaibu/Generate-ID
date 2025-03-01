function generatePDF() {
    let trackingId = document.getElementById("trackingId").value;
    let errorMessage = document.getElementById("errorMessage");
    let downloadLink = document.getElementById("downloadLink");

    // Clear previous messages
    errorMessage.textContent = "";
    downloadLink.style.display = "none";

    // Validate input
    if (!/^\d{15}$/.test(trackingId)) {
        errorMessage.textContent = "Invalid ID. Please enter a 15-digit number.";
        return;
    }

    let apiUrl = `https://your-api.com/generate/${trackingId}`; // Replace with your actual API URL

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("In Processing Error");
            }
            return response.blob();
        })
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = `${trackingId}.pdf`;
            downloadLink.style.display = "block";
            downloadLink.textContent = "Download PDF";
        })
        .catch(error => {
            errorMessage.textContent = error.message === "In Processing Error" ? "In Processing Error" : "Invalid ID";
        });
}

