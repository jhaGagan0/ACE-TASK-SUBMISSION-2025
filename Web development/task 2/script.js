let selectedTemplate = null;
const canvas = document.getElementById("meme-canvas");
const ctx = canvas.getContext("2d");
const memeSelect = document.getElementById("meme-select");

// Fetch meme templates and populate dropdown
fetch("https://api.imgflip.com/get_memes")
  .then(res => res.json())
  .then(data => {
    const memes = data.data.memes.slice(0, 100);
    memes.forEach(meme => {
      const option = document.createElement("option");
      option.value = meme.url;
      option.textContent = meme.name;
      memeSelect.appendChild(option);
    });
  });

// Load selected template into canvas
memeSelect.addEventListener("change", () => {
  const url = memeSelect.value;
  if (!url) return;
  selectedTemplate = url;
  loadTemplate(url);
});

// Load template into canvas
function loadTemplate(url) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };
}

// Generate meme with text
document.getElementById("generate-btn").addEventListener("click", () => {
  if (!selectedTemplate) {
    alert("Please select a meme template!");
    return;
  }
  const topText = document.getElementById("top-text").value;
  const bottomText = document.getElementById("bottom-text").value;

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = selectedTemplate;
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // Text styling
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.font = `${Math.floor(canvas.width / 12)}px Impact`;

    // Top text
    ctx.fillText(topText.toUpperCase(), canvas.width / 2, 60);
    ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 60);

    // Bottom text
    ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
  };
});

// Download meme
document.getElementById("download-btn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
});
