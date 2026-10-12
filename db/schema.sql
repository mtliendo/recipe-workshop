create table if not exists recipes (
  id text primary key,
  owner text not null,
  title text not null,
  note text not null default '',
  servings text not null default '',
  "time" text not null default '',
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  photo text not null default '',
  position integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table recipes add column if not exists owner text;

delete from recipes
where id in ('sunday-brisket', 'cast-iron-cornbread', 'peach-cobbler')
   or owner is null;

alter table recipes alter column owner set not null;

create index if not exists recipes_owner_idx on recipes (owner);
