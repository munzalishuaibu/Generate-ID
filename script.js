function generatePDF() {
    let trackingId = document.getElementById("trackingId").value;
    let message = document.getElementById("message");

    message.textContent = ""; // Clear previous messages

    if (!/^[A-Za-z0-9]{15}$/.test(trackingId)) {
        message.textContent = "Error: Please enter a valid 15-character tracking ID!";
        return;
    }

    let apiUrl = `https://api.verxid.site/nimc-world-bank/live/v2/slip2?trackingid=${trackingId}&center_username=kdkadsrimamhmmdbhrwyerc&center_pass=D0x$5zHO`;

    fetch(apiUrl, { method: 'GET' })
        .then(response => {
            if (response.status === 400) {
                throw new Error("Invalid Tracking ID");
            } else if (response.status === 202) {
                throw new Error("Tracking ID has a processing Error");
            } else if (!response.ok) {
                throw new Error("An unknown error occurred");
            }
            return response.blob();
        })
        .then(blob => {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${trackingId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            message.style.color = "green";
            message.textContent = "PDF downloaded successfully!";
        })
        .catch(error => {
            message.style.color = "red";
            message.textContent = "Error: " + error.message;
        });
}