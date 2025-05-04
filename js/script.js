document.getElementById("uploadForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const output = document.getElementById("output");
  output.innerHTML = "Uploading...";

  try {
    const response = await fetch("https://zaras-fashion-ai-production.railway.app/api/generate", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    output.innerHTML = result.video_url
      ? `<video src="${result.video_url}" controls></video>`
      : "Error: " + (result.message || "No video returned.");
  } catch (err) {
    output.innerHTML = "Failed to connect to the server.";
  }
});
