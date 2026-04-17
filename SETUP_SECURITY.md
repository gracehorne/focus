# Security Setup: Protecting API Keys

Your API keys and webhook URLs are now secured. Here's how to set them up:

## 1. Create a `.env` file

Copy `.env.example` to `.env` and add your actual values:

```bash
cp .env.example .env
```

Edit `.env` with your sensitive credentials:
```env
KN_API_KEY=your-kinopio-api-key
LOG_WEBHOOK_URL=https://script.google.com/macros/s/YOUR-SCRIPT-ID/exec
GCAL_SCRIPT_URL=https://script.google.com/macros/s/YOUR-CALENDAR-SCRIPT-ID/exec
```

**Never commit `.env` to git** — it's already in `.gitignore`.

## 2. Load configuration in your backend (api.php)

Update your `api.php` to load these environment variables:

```php
<?php
// Load environment variables from .env
require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Now access keys securely:
$kn_api_key = $_ENV['KN_API_KEY'] ?? '';
$log_webhook_url = $_ENV['LOG_WEBHOOK_URL'] ?? '';
$gcal_script_url = $_ENV['GCAL_SCRIPT_URL'] ?? '';
```

If you don't use Composer, manually load from `.env`:

```php
<?php
$env = [];
if (file_exists(__DIR__ . '/../.env')) {
    $lines = file(__DIR__ . '/../.env', FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $env[trim($key)] = trim($value);
        }
    }
}

$kn_api_key = $env['KN_API_KEY'] ?? '';
```

## 3. Use Kinopio API through your backend

Instead of calling Kinopio directly from the frontend, proxy requests through `api.php`:

**Frontend (index.html)**: Remove direct API calls, use backend instead
```javascript
// Instead of:
// const resp = await fetch(`https://api.kinopio.club${path}`, {
//   headers: { 'Authorization': KN_API_KEY, ...

// Use:
const resp = await fetch('https://garcehorne.com/api.php', {
  method: 'POST',
  body: JSON.stringify({ action: 'kn_fetch', path: path })
});
```

**Backend (api.php)**: Handle the proxy request
```php
if ($_REQUEST['action'] === 'kn_fetch') {
    $path = $_REQUEST['path'] ?? '';
    $resp = file_get_contents('https://api.kinopio.club' . $path, false, 
        stream_context_create([
            'http' => [
                'header' => 'Authorization: ' . $kn_api_key . "\r\nContent-Type: application/json\r\n"
            ]
        ])
    );
    echo $resp;
    exit;
}
```

## 4. Install Composer (optional but recommended)

For better `.env` file handling:

```bash
cd /path/to/your/project
composer require vlucas/phpdotenv
```

## Security Checklist

✅ Remove all hardcoded API keys from HTML/JavaScript  
✅ Store keys in `.env` file  
✅ Add `.env` to `.gitignore`  
✅ Never commit `.env` to version control  
✅ Load keys server-side in `api.php`  
✅ Proxy API requests through backend when possible  
✅ In production, use your server's environment variables (don't rely on `.env`)

## For Production

On your production server, don't use `.env` files. Instead:

**On shared hosting**: Use your host's control panel to set environment variables  
**On VPS/cloud**: Set environment variables via:
- Dockerfile ENV directives
- systemd service environment
- Docker Compose environment section
- Cloud provider's secrets manager

## Regenerate Your Keys!

⚠️ **Important**: The keys shown in your repository are now public on GitHub. You should:

1. Revoke the old Kinopio API key
2. Generate a new one
3. Update your `.env` file with the new key
4. Do the same for your Google Apps Script URLs if they contain sensitive data
