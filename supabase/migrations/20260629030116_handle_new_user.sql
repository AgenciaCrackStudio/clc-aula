-- On auth signup, create the matching public.users row from the signUp metadata.
-- role is intentionally NOT taken from metadata; it always defaults to 'student'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (
    id, first_name, last_name, email, phone, country, marketing_opt_in, accepted_terms_at
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email,
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'country',
    coalesce((new.raw_user_meta_data ->> 'marketing_opt_in')::boolean, false),
    case
      when coalesce((new.raw_user_meta_data ->> 'accepted_terms')::boolean, false)
      then now()
    end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
