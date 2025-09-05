let shortenedUrlValue = '';

// URL validation function
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// Format URL to ensure it has protocol
function formatUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}

// Show error message
function showError(message) {
  const errorEl = document.getElementById('error');
  errorEl.textContent = message;
  errorEl.classList.add('show');
  
  setTimeout(() => {
    errorEl.classList.remove('show');
  }, 5000);
}

// Hide all result elements
function hideResults() {
  document.getElementById('result').classList.remove('show');
  document.getElementById('error').classList.remove('show');
  document.getElementById('loading').style.display = 'none';
}

// Show loading state
function showLoading() {
  hideResults();
  document.getElementById('loading').style.display = 'block';
  document.getElementById('shortenBtn').disabled = true;
  document.getElementById('shortenBtn').textContent = 'Shortening...';
}

// Hide loading state
function hideLoading() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('shortenBtn').disabled = false;
  document.getElementById('shortenBtn').textContent = 'Shorten URL';
}

// Shorten URL using TinyURL API (free, no auth required)
async function shortenUrl(longUrl) {
  try {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    
    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }
    
    const shortUrl = await response.text();
    
    if (shortUrl.includes('Error')) {
      throw new Error('Invalid URL provided');
    }
    
    return shortUrl;
  } catch (error) {
    // Fallback to is.gd API
    try {
      const fallbackResponse = await fetch('https://is.gd/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `format=simple&url=${encodeURIComponent(longUrl)}`
      });
      
      if (!fallbackResponse.ok) {
        throw new Error('Fallback API failed');
      }
      
      const fallbackShortUrl = await fallbackResponse.text();
      
      if (fallbackShortUrl.includes('Error')) {
        throw new Error('Invalid URL provided');
      }
      
      return fallbackShortUrl;
    } catch (fallbackError) {
      throw new Error('URL shortening service is currently unavailable. Please try again later.');
    }
  }
}

// Copy to clipboard function
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(shortenedUrlValue);
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = '✅ Copied!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.textContent = '📋 Copy URL';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = shortenedUrlValue;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = '✅ Copied!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.textContent = '📋 Copy URL';
      copyBtn.classList.remove('copied');
    }, 2000);
  }
}

// Form submit handler
document.getElementById('urlForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const longUrlInput = document.getElementById('longUrl');
  let longUrl = longUrlInput.value.trim();
  
  if (!longUrl) {
    showError('Please enter a URL to shorten.');
    return;
  }
  
  // Format URL
  longUrl = formatUrl(longUrl);
  
  // Validate URL
  if (!isValidUrl(longUrl)) {
    showError('Please enter a valid URL (e.g., https://example.com).');
    return;
  }
  
  showLoading();
  
  try {
    const shortUrl = await shortenUrl(longUrl);
    
    // Update the input with formatted URL
    longUrlInput.value = longUrl;
    
    // Store the shortened URL
    shortenedUrlValue = shortUrl.trim();
    
    // Display result
    document.getElementById('shortenedUrl').textContent = shortenedUrlValue;
    document.getElementById('originalLength').textContent = longUrl.length;
    document.getElementById('shortenedLength').textContent = shortenedUrlValue.length;
    
    hideLoading();
    document.getElementById('result').classList.add('show');
    
  } catch (error) {
    hideLoading();
    showError(error.message);
  }
});

// Clear results when input changes
document.getElementById('longUrl').addEventListener('input', () => {
  hideResults();
});

// Auto-focus on input
document.getElementById('longUrl').focus();
