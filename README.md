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

The booking Edge Functions need server-side Supabase access. Supabase normally
provides `SUPABASE_SERVICE_ROLE_KEY` automatically to deployed Edge Functions,
and the dashboard may reject new secrets that start with `SUPABASE_` because
those names are reserved.

If you need to add the service role key manually, use this custom fallback name:

```bash
supabase secrets set SERVICE_ROLE_KEY="your-service-role-key"
supabase secrets set ADMIN_SECRET="your-admin-secret"
supabase secrets set RESEND_API_KEY="your-resend-api-key"
```

`RESEND_API_KEY` is only needed for confirmation emails. The Edge Functions read
`SUPABASE_SERVICE_ROLE_KEY` first and fall back to `SERVICE_ROLE_KEY`.
