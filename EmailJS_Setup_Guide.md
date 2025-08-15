# EmailJS Setup Guide for Portfolio Contact Form

## Overview
Your contact form is now configured to use EmailJS for sending emails directly from your static website without needing a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (you'll need this later)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Fill in the template details:
   - **Template Name**: Portfolio Contact Form (or any name you prefer)
   - **Subject**: New Contact Form Message from {{from_name}}
   - **Content**: Use the template below

**Email Template Content:**
```
Hello {{to_name}},

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Click "Save" button
5. **IMPORTANT - Finding Template ID**: 
   - After saving, you'll see your template in the list
   - The **Template ID** appears in the template list (it looks like: `template_xxxxxxx`)
   - You can also click on the template name to edit it, and the ID will be visible in the URL
   - Copy this Template ID - you'll need it for your JavaScript code

**Example Template ID**: `template_abc123def` (yours will be different)

### 4. Get Public Key
1. Go to "Account" > "General" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key - it looks like: `user_xxxxxxxxxxxxxxx`

### 5. Find Your Service ID
1. Go back to "Email Services" in your dashboard
2. You'll see your connected email service in the list
3. The **Service ID** is displayed next to your service name
4. It looks like: `service_xxxxxxx`
5. Copy this Service ID

### 6. Update Your Code
Open `js/script.js` and replace the following placeholders with your actual IDs:

```javascript
// Replace this line:
emailjs.init("YOUR_PUBLIC_KEY");
// With your actual public key:
emailjs.init("user_your_actual_public_key");

// Replace these lines:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// With your actual IDs:
emailjs.send('service_your_service_id', 'template_your_template_id', templateParams)
```

**Example with real IDs:**
```javascript
emailjs.init("user_abc123def456");
emailjs.send('service_gmail789', 'template_contact123', templateParams)
```

### 7. Test Your Form
1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your email for the message

## Quick Reference - Where to Find Your IDs

### Template ID Location:
1. **EmailJS Dashboard** → **Email Templates**
2. Look for your template in the list
3. The Template ID is shown in the format: `template_xxxxxxxxx`
4. Alternative: Click on template name → ID is in the URL

### Service ID Location:
1. **EmailJS Dashboard** → **Email Services** 
2. Your connected service shows the ID like: `service_xxxxxxxxx`

### Public Key Location:
1. **EmailJS Dashboard** → **Account** → **General**
2. Look for "Public Key" or "User ID": `user_xxxxxxxxx`

## Email Template Variables Used
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Sender's phone number
- `{{message}}` - The message content
- `{{to_name}}` - Your name (recipient)

## Free Plan Limits
- 200 emails per month
- EmailJS branding in emails
- Basic support

## Troubleshooting

### Form not sending emails:
1. Check browser console for errors
2. Verify your Public Key, Service ID, and Template ID are correct
3. Make sure your email service is properly connected
4. Check your spam folder

### Common errors:
- **Invalid public key**: Double-check your public key
- **Template not found**: Verify your template ID
- **Service not found**: Check your service ID
- **Blocked by CORS**: This shouldn't happen with EmailJS

## Security Notes
- Your EmailJS public key is safe to expose in client-side code
- EmailJS handles all the security for email sending
- No sensitive credentials are exposed in your website code

## Next Steps
1. Complete the EmailJS setup following this guide
2. Test the form thoroughly
3. Consider upgrading to a paid plan if you expect more than 200 emails/month

## Support
If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/contact/

---
Your contact form is now ready to send emails! Just complete the EmailJS setup and update the IDs in your JavaScript file.
