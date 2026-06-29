-- handle_new_user is only invoked by the auth.users trigger, never as an API RPC.
-- Revoke EXECUTE so it is not callable by anon/authenticated (the trigger still runs,
-- since it executes as the function owner regardless of these grants).
revoke execute on function public.handle_new_user() from public, anon, authenticated;
