# Novum booking setup

## Frontend environment

Copy `.env.example` to `.env` for local development and fill in the Supabase
project values:

```bash
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
```

The public pages render without these values, but booking actions such as loading
available slots and creating bookings require them.

## Supabase Edge Function secrets

The booking Edge Functions also need server-side secrets in the Supabase project:

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
supabase secrets set ADMIN_SECRET="your-admin-secret"
supabase secrets set RESEND_API_KEY="your-resend-api-key"
```

`RESEND_API_KEY` is only needed for confirmation emails. `SUPABASE_SERVICE_ROLE_KEY`
is required by `get-available-slots`, `create-booking`, `admin-bookings`, and
`ical-feed`.
