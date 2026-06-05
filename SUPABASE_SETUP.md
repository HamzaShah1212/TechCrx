# Supabase Setup Guide

## 🚀 Quick Setup

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with email or GitHub

### Step 2: Create a New Project
1. Click "New Project"
2. Enter project name: `techrx`
3. Create a strong password
4. Select your region
5. Click "Create new project"

### Step 3: Create Database Table
1. Go to "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste this SQL:

```sql
CREATE TABLE public.contacts (
  id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
  name CHARACTER VARYING(100) NOT NULL,
  email CHARACTER VARYING(255) NOT NULL,
  phone CHARACTER VARYING(20) NULL,
  subject CHARACTER VARYING(255) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT contacts_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow inserts" ON public.contacts
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow selects (for admin)
CREATE POLICY "Allow selects" ON public.contacts
  FOR SELECT
  USING (true);
```

4. Click "Run"

### Step 4: Get Your Credentials
1. Go to "Settings" → "API"
2. Copy your:
   - **Project URL** (VITE_SUPABASE_URL)
   - **Anon Key** (VITE_SUPABASE_ANON_KEY)

### Step 5: Update .env.local
Edit `.env.local` in your project root:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual credentials from Step 4.

### Step 6: Test the Form
1. Start dev server: `npm run dev`
2. Go to Contact section
3. Fill out the form with:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Subject (optional)
   - Message (required)
4. Submit and check Supabase dashboard

## 📊 View Submissions

1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select "contacts" table
4. See all form submissions with:
   - ID
   - Name
   - Email
   - Phone
   - Subject
   - Message
   - Created At (timestamp)

## 🔒 Security Notes

- The Anon Key is safe to expose (it's public)
- Row Level Security (RLS) is enabled
- Only INSERT and SELECT operations are allowed
- No authentication required for submissions
- All fields are validated on the client side

## 🛠️ Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify .env.local has correct credentials
- Make sure table exists in Supabase
- Check that table name is "contacts"

### Can't see submissions?
- Refresh the page
- Check if RLS policies are enabled
- Verify table structure matches the SQL

### Getting CORS errors?
- This is normal for Supabase
- Make sure you're using the correct URL format
- Check that Anon Key is correct

## 📝 Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | VARCHAR(100) | Yes | User's full name |
| email | VARCHAR(255) | Yes | Valid email address |
| phone | VARCHAR(20) | No | Phone number |
| subject | VARCHAR(255) | No | Subject of inquiry |
| message | TEXT | Yes | Main message content |
| created_at | TIMESTAMP | Auto | Automatically set to current time |

## 📝 Environment Variables

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are loaded automatically from `.env.local`

## 🚀 Deployment

When deploying to Vercel:
1. Go to Vercel project settings
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Your contact form is now connected to Supabase! 🎉**
