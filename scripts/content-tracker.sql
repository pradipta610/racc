-- Content Tracker: run this once in Supabase SQL Editor (Dashboard > SQL Editor > New query)

create table if not exists content_tracker_items (
  id text primary key,
  title text not null,
  stage text not null default 'draft' check (stage in ('draft','review','revisi','publish')),
  deadline date,
  link text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table content_tracker_items enable row level security;

-- Internal tool, no login screen: anon key (client-side) needs full read/write,
-- matching how the other internal tool tables in this project already work.
create policy "content_tracker_items_select" on content_tracker_items
  for select using (true);
create policy "content_tracker_items_insert" on content_tracker_items
  for insert with check (true);
create policy "content_tracker_items_update" on content_tracker_items
  for update using (true) with check (true);
create policy "content_tracker_items_delete" on content_tracker_items
  for delete using (true);

-- Required for the live cross-tab sync (Supabase Realtime postgres_changes).
alter publication supabase_realtime add table content_tracker_items;
