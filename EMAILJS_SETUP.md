# EmailJS Setup Instructions

This portfolio uses EmailJS to handle form submissions without a backend server.

## Setup Steps

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (200 emails/month free)

2. **Add Email Service**
   - Go to Email Services in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**
   - Go to Email Templates
   - Click "Create New Template"
   - Use this template structure:
     ```
     From Name: {{user_name}}
     From Email: {{user_email}}
     Subject: New Contact Form Submission
     
     Message:
     {{message}}
     ```
   - Save the template and note the Template ID

4. **Get Your Keys**
   - Go to Account → General
   - Copy your Public Key
   - Note your Service ID (from Email Services)
   - Note your Template ID (from Email Templates)

5. **Update the Code**
   - Open `main.js`
   - Find the line: `emailjs.init('YOUR_PUBLIC_KEY');`
   - Replace `YOUR_PUBLIC_KEY` with your actual public key
   - Find: `'YOUR_SERVICE_ID'` and replace with your service ID
   - Find: `'YOUR_TEMPLATE_ID'` and replace with your template ID

## Example Configuration

```javascript
// In main.js, replace:
emailjs.init('YOUR_PUBLIC_KEY');

// With:
emailjs.init('abc123xyz789');

// And replace:
await emailjs.sendForm(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    form
);

// With:
await emailjs.sendForm(
    'service_abc123',
    'template_xyz789',
    form
);
```

## Testing

After setup, test the form by submitting a message. You should receive an email at the address you configured in your Email Service.

## Free Tier Limits

- 200 emails per month
- Perfect for portfolio sites
- Upgrade available if needed

