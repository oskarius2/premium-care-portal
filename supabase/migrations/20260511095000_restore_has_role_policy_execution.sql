-- RLS-policies för adminvyer anropar public.has_role(auth.uid(), 'admin').
-- Funktionen måste därför vara körbar för inloggade användare, men ska inte
-- kunna användas som en generell roll-lookup för andra användares UUID.

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select _user_id = auth.uid()
    and exists (
      select 1
      from public.user_roles
      where user_id = _user_id
        and role = _role
    )
$$;

revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
