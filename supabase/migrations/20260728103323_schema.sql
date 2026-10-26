-- Get Work Abroad database schema.
--
-- The 13 migrations applied to the original project (yscvyhpltclbwuuwzdca,
-- July 2026), replayed in order. Kept here so the database can be rebuilt
-- from the repo. Seed rows for admins and clients are part of the history.

-- ── 20260724125330 candidates_partners_submissions ─────────────────────────

create table public.candidates (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  name              text not null,
  email             text not null,
  phone             text,
  language          text not null,
  preferred_country text,
  role_type         text,
  role_interest     text,
  message           text,
  cv_path           text,
  cv_filename       text,
  source            text not null default 'website',
  status            text not null default 'new'
                    check (status in ('new','reviewing','shared','placed','closed')),
  network_opt_out   boolean not null default false,
  consent_at        timestamptz,
  notes             text
);

create table public.partners (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  contact_name  text,
  contact_email text,
  countries     text[] not null default '{}',
  languages     text[] not null default '{}',
  notes         text,
  active        boolean not null default true
);

create table public.submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  candidate_id      uuid not null references public.candidates(id) on delete cascade,
  partner_id        uuid references public.partners(id) on delete set null,
  role              text,
  sent_at           date not null default current_date,
  status            text not null default 'sent'
                    check (status in ('sent','screening','interview','offer','placed','rejected','withdrawn')),
  status_changed_at timestamptz not null default now(),
  notes             text
);

create index candidates_created_idx  on public.candidates (created_at desc);
create index candidates_status_idx   on public.candidates (status);
create index candidates_language_idx on public.candidates (language);
create index submissions_candidate_idx on public.submissions (candidate_id);
create index submissions_status_idx    on public.submissions (status);

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger candidates_touch before update on public.candidates
  for each row execute function public.touch_updated_at();

create or replace function public.touch_status_changed() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.status is distinct from old.status then
    new.status_changed_at = now();
  end if;
  return new;
end;
$$;

create trigger submissions_touch_status before update on public.submissions
  for each row execute function public.touch_status_changed();

alter table public.candidates  enable row level security;
alter table public.partners    enable row level security;
alter table public.submissions enable row level security;

-- Private bucket. CVs are only ever served through a signed URL.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cvs', 'cvs', false, 10485760,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf',
    'text/plain'
  ]
);

-- ── 20260724140852 admin_access_policies ───────────────────────────────────
-- anon may INSERT a candidate and upload a CV, nothing else. Everything else
-- requires a signed-in user whose email is in `admins`.

create table public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

insert into public.admins (email) values
  ('magnus@clearscaler.com'),
  ('hello@getworkabroad.com');

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.admins a
    where a.email = (select auth.jwt() ->> 'email')
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create policy "admins read the admin list"
  on public.admins for select to authenticated using (public.is_admin());

create policy "anyone may apply"
  on public.candidates for insert to anon, authenticated with check (true);

create policy "admins read candidates"
  on public.candidates for select to authenticated using (public.is_admin());
create policy "admins update candidates"
  on public.candidates for update to authenticated using (public.is_admin());
create policy "admins delete candidates"
  on public.candidates for delete to authenticated using (public.is_admin());

create policy "admins manage partners"
  on public.partners for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins manage submissions"
  on public.submissions for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "anyone may upload a cv"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'cvs');

create policy "admins read cvs"
  on storage.objects for select to authenticated
  using (bucket_id = 'cvs' and public.is_admin());

create policy "admins delete cvs"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cvs' and public.is_admin());

-- ── 20260724143532 topjobs_pipeline_and_third_admin ────────────────────────

alter table public.candidates drop constraint candidates_status_check;

update public.candidates set status = 'sent_to_topjobs' where status = 'shared';

alter table public.candidates add constraint candidates_status_check
  check (status in (
    'new',
    'reviewing',
    'sent_to_topjobs',
    'interviewing',
    'placed',
    'rejected',
    'closed'
  ));

alter table public.candidates drop column network_opt_out;

insert into public.admins (email) values ('kian@clearscaler.com')
  on conflict (email) do nothing;

-- ── 20260724153632 eu_passport_and_availability ────────────────────────────

alter table public.candidates
  add column eu_passport boolean,
  add column availability text
    check (availability in ('this_month', '1_3_months', 'later'));

create index candidates_eu_passport_idx on public.candidates (eu_passport);

comment on column public.candidates.eu_passport is
  'True if the candidate says they hold an EU passport. Drives the EU / non-EU pools in the admin.';
comment on column public.candidates.availability is
  'How soon they could move: this_month, 1_3_months, later.';

-- ── 20260724222528 candidate_screening_fields ──────────────────────────────

alter table public.candidates
  add column english_level text
    check (english_level in ('basic', 'conversational', 'fluent', 'native')),
  add column commitment text
    check (commitment in ('ready_now', 'planning', 'exploring')),
  add column relocated_before boolean;

comment on column public.candidates.english_level is
  'Self-reported English. B2/conversational is the floor for training and internal comms.';
comment on column public.candidates.commitment is
  'How set they are on moving: ready_now, planning, exploring. The seriousness signal.';
comment on column public.candidates.relocated_before is
  'Has lived or worked abroad before — a proxy for readiness to go fast.';

-- ── 20260727192824 harden_anon_insert_and_policy_perf ──────────────────────

drop policy if exists "anyone may apply" on public.candidates;
create policy "anyone may apply"
  on public.candidates for insert to anon, authenticated
  with check (
    status = 'new'
    and source = 'website'
    and consent_at is not null
    and eu_passport is not null
    and char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and (phone is null or char_length(phone) <= 40)
    and (message is null or char_length(message) <= 5000)
    and notes is null
    and role_interest is null or char_length(role_interest) <= 200
  );

drop policy if exists "admins read candidates" on public.candidates;
drop policy if exists "admins update candidates" on public.candidates;
drop policy if exists "admins delete candidates" on public.candidates;
create policy "admins read candidates" on public.candidates
  for select to authenticated using ((select public.is_admin()));
create policy "admins update candidates" on public.candidates
  for update to authenticated using ((select public.is_admin()));
create policy "admins delete candidates" on public.candidates
  for delete to authenticated using ((select public.is_admin()));

revoke execute on function public.is_admin() from anon;

-- ── 20260727192911 access_log ──────────────────────────────────────────────

create table public.access_log (
  id          bigint generated always as identity primary key,
  actor_email text not null,
  action      text not null check (action in
                ('view_cv','download_cv','csv_export','delete_candidate')),
  candidate_id uuid references public.candidates(id) on delete set null,
  detail      text,
  created_at  timestamptz not null default now()
);
create index access_log_created_idx on public.access_log (created_at desc);

alter table public.access_log enable row level security;

create policy "admins read access log" on public.access_log
  for select to authenticated using ((select public.is_admin()));
create policy "admins append access log" on public.access_log
  for insert to authenticated with check ((select public.is_admin()));

-- ── 20260727192945 scale_search_readiness_indexes ──────────────────────────

create extension if not exists pg_trgm;

alter table public.candidates
  add column if not exists search_text text generated always as (
    lower(
      coalesce(name,'') || ' ' || coalesce(email,'') || ' ' ||
      coalesce(phone,'') || ' ' || coalesce(role_interest,'') || ' ' ||
      coalesce(preferred_country,'')
    )
  ) stored;
create index if not exists candidates_search_trgm
  on public.candidates using gin (search_text gin_trgm_ops);

create index if not exists candidates_status_created_idx
  on public.candidates (status, created_at desc, id desc);
create index if not exists candidates_eu_created_idx
  on public.candidates (eu_passport, created_at desc, id desc);


-- ── 20260727193814 align_readiness_tier_unscreened ─────────────────────────
-- (Originally added with 'unscored' and then replaced; the final column is
-- created directly here, before candidate_overview() which reads it.)

alter table public.candidates
  add column readiness_tier text generated always as (
    case
      when eu_passport = false then 'ineligible'
      when availability is null and commitment is null
        and english_level is null and eu_passport is null then 'unscreened'
      when (
        (case availability when 'this_month' then 3 when '1_3_months' then 2 else 0 end)
        + (case commitment when 'ready_now' then 3 when 'planning' then 1 else 0 end)
        + (case english_level when 'native' then 2 when 'fluent' then 2 when 'conversational' then 1 else 0 end)
        + (case when relocated_before then 1 else 0 end)
        + (case when cv_path is not null then 1 else 0 end)
      ) >= 7
        and availability = any (array['this_month','1_3_months'])
        and commitment = any (array['ready_now','planning'])
        and english_level is distinct from 'basic' then 'ready'
      when (
        (case availability when 'this_month' then 3 when '1_3_months' then 2 else 0 end)
        + (case commitment when 'ready_now' then 3 when 'planning' then 1 else 0 end)
        + (case english_level when 'native' then 2 when 'fluent' then 2 when 'conversational' then 1 else 0 end)
        + (case when relocated_before then 1 else 0 end)
        + (case when cv_path is not null then 1 else 0 end)
      ) >= 4
        and availability = any (array['this_month','1_3_months']) then 'warming'
      else 'early'
    end
  ) stored;
create index candidates_readiness_created_idx
  on public.candidates (readiness_tier, created_at desc, id desc);

create or replace function public.candidate_overview()
returns jsonb language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object(
    'total', count(*),
    'new', count(*) filter (where status = 'new'),
    'reviewing', count(*) filter (where status = 'reviewing'),
    'sent_to_topjobs', count(*) filter (where status = 'sent_to_topjobs'),
    'interviewing', count(*) filter (where status = 'interviewing'),
    'placed', count(*) filter (where status = 'placed'),
    'rejected', count(*) filter (where status = 'rejected'),
    'closed', count(*) filter (where status = 'closed'),
    'ready', count(*) filter (where readiness_tier = 'ready'),
    'eu', count(*) filter (where eu_passport is true),
    'non_eu', count(*) filter (where eu_passport is not true),
    'new_7d', count(*) filter (where created_at > now() - interval '7 days'),
    'ready_not_sent', count(*) filter (
      where readiness_tier = 'ready' and status in ('new','reviewing')),
    'unreviewed', count(*) filter (where status = 'new')
  )
  from public.candidates;
$$;

grant execute on function public.candidate_overview() to authenticated;

-- ── 20260727194648 restrict_is_admin_execute_to_authenticated ──────────────

revoke execute on function public.is_admin() from public;
revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

-- ── 20260728103312 clients_table_and_candidate_placement ───────────────────

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  rebate_days integer check (rebate_days is null or (rebate_days >= 0 and rebate_days <= 366)),
  active boolean not null default true
);
alter table public.clients enable row level security;
drop policy if exists "admins manage clients" on public.clients;
create policy "admins manage clients" on public.clients
  for all using (public.is_admin()) with check (public.is_admin());
grant select, insert, update, delete on public.clients to authenticated;

alter table public.candidates
  add column if not exists client_id uuid references public.clients(id) on delete set null;
alter table public.candidates
  add column if not exists start_date date;

drop policy if exists "anyone may apply" on public.candidates;
create policy "anyone may apply" on public.candidates
  for insert to anon, authenticated
  with check (
    status = 'new'
    and source = 'website'
    and consent_at is not null
    and eu_passport is not null
    and char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and (phone is null or char_length(phone) <= 40)
    and (message is null or char_length(message) <= 5000)
    and notes is null
    and (role_interest is null or char_length(role_interest) <= 200)
    and client_id is null
    and start_date is null
  );
