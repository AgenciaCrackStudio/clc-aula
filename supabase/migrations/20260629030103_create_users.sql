-- Application user profile, one-to-one with auth.users. NOT named "profiles" by request.
create table public.users (
  id                uuid primary key references auth.users (id) on delete cascade,
  first_name        text not null default '',
  last_name         text not null default '',
  email             text not null,
  phone             text,
  country           text,
  role              public.app_role not null default 'student',
  marketing_opt_in  boolean not null default false,
  accepted_terms_at timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.users is 'Application user profiles (1:1 with auth.users). Distinct from auth.users.';

alter table public.users enable row level security;

-- Each authenticated user can read and update only their own row.
create policy "Users can view own profile"
  on public.users for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.users for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Keep updated_at fresh on every update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- Block clients from changing immutable / privileged columns (anti privilege-escalation).
-- The service role (admin backend, separate repo) is exempt and may change anything.
create or replace function public.enforce_user_immutables()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if coalesce(auth.jwt() ->> 'role', '') = 'service_role' then
    return new;
  end if;
  new.id         := old.id;
  new.email      := old.email;
  new.role       := old.role;
  new.created_at := old.created_at;
  return new;
end;
$$;

create trigger users_enforce_immutables
  before update on public.users
  for each row execute function public.enforce_user_immutables();
