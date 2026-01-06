# EmailJS Setup Guide

This guide will help you set up EmailJS to enable form submissions on the contact page.

## Prerequisites

1. A Gmail account or any other email service provider
2. An EmailJS account (free tier available)

## Step-by-Step Setup

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click on "Sign Up" and create a free account
3. Verify your email address

### 2. Add an Email Service

1. After logging in, go to the **Email Services** page
2. Click **Add New Service**
3. Choose your email provider (e.g., Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down the **Service ID** (you'll need this later)

### 3. Create an Email Template

1. Go to the **Email Templates** page
2. Click **Create New Template**
3. Set up your template with the following variables:
   ```
   Subject: New Contact Form Submission from {{from_name}}
   
   From: {{from_name}} ({{from_email}})
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   This message was sent from the contact form on your portfolio website.
   ```
4. Make sure the template includes these variables:
   - `{{from_name}}` - The sender's name
   - `{{from_email}}` - The sender's email
   - `{{subject}}` - The message subject
   - `{{message}}` - The message content
5. Set the **To Email** field to: `tahmidbintaslimrafi@gmail.com`
6. Save the template and note down the **Template ID**

### 4. Get Your Public Key

1. Go to the **Account** page
2. Find your **Public Key** (also called API Key)
3. Note it down

### 5. Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following environment variables:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
3. Replace the placeholder values with your actual EmailJS credentials
4. Save the file

### 6. Restart Your Development Server

After setting up the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## Testing the Contact Form

1. Navigate to the contact section on your website
2. Fill out the form with test data
3. Click "Send Message"
4. Check your email inbox at tahmidbintaslimrafi@gmail.com
5. You should receive an email with the form submission details

## Troubleshooting

### Form submission fails with "EmailJS is not configured" error

- Make sure you've created the `.env.local` file
- Verify that all three environment variables are set correctly
- Restart your development server after adding the environment variables

### Emails are not being received

- Check your EmailJS dashboard to see if the email was sent
- Verify that the **To Email** in your template is set to `tahmidbintaslimrafi@gmail.com`
- Check your spam folder
- Make sure your email service is properly connected in EmailJS

### Form submission is slow

- This is normal for the free tier of EmailJS
- Consider upgrading to a paid plan if you expect high traffic

## Security Notes

- Never commit your `.env.local` file to Git (it's already in `.gitignore`)
- The environment variables starting with `NEXT_PUBLIC_` are safe to expose to the browser
- EmailJS handles the actual email sending securely on their servers

## Support

For more information, visit the [EmailJS Documentation](https://www.emailjs.com/docs/).
