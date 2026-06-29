# Database migrations

Every DDL change to the Supabase project (`otyxjqibihfunaxiglvz`) lives here as a timestamped
SQL file so the schema can be rebuilt from scratch. Files are **append-only** and ordered by their
`YYYYMMDDHHMMSS_` prefix.

## Workflow

1. Write the change as a new `YYYYMMDDHHMMSS_<name>.sql` file in this folder.
2. Apply it to the remote project (via the Supabase MCP `apply_migration`, or the Supabase CLI
   `supabase db push`). The file content and what is applied must stay identical.
3. After schema changes, run the security advisors and regenerate types
   (`src/lib/database.types.ts`).

## Migrations

| File | Purpose |
|------|---------|
| `20260629030046_create_app_role_enum.sql` | `app_role` enum (`student`, `teacher`, `coordinator`, `director`, `admin`). |
| `20260629030103_create_users.sql` | `public.users` profile table (1:1 with `auth.users`), RLS, `updated_at` + immutability triggers. |
| `20260629030116_handle_new_user.sql` | Trigger that creates a `public.users` row on signup from auth metadata (role always `student`). |
| `20260629030214_harden_handle_new_user.sql` | Revoke `EXECUTE` on `handle_new_user` from API roles (advisor hardening). |

## Notes

- Only the `student` role authenticates in this repo (the student aula). The other roles exist for the
  separate admin platform and never log in here.
- `public.users.role` cannot be changed by clients (locked by the `enforce_user_immutables` trigger);
  role management happens in the admin repo via the service role.
