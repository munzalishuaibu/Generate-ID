function generatePDF() {
    let trackingId = document.getElementById("trackingId").value;
    let errorMessage = document.getElementById("errorMessage");
    let downloadLink = document.getElementById("downloadLink");

    // Clear previous messages
    errorMessage.textContent = "";
    downloadLink.style.display = "none";

    // Validate input
    if (!/^\d{11}$/.test(trackingId)) {
        errorMessage.textContent = "Invalid ID. Please enter an 11-digit number.";
        return;
    }

    let apiUrl = https://api.verxid.site/nimc-world-bank/live/v2/slip2?trackingid=0RWI4O5SDPS2YCL&center_username=kdkadsrimamhmmdbhrwyerc&center_pass=D0x$5zHO

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