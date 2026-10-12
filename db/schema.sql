create table if not exists recipes (
  id text primary key,
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

insert into recipes (id, title, note, servings, "time", ingredients, steps, photo, position)
values
  (
    'sunday-brisket',
    'Sunday Brisket',
    $note$Salt it the night before and do not peek. If dinner is at six, the pan goes in before breakfast.$note$,
    '8',
    '12 hours',
    $json$[{"id":"brisket-meat","amount":"5 lb","item":"beef brisket"},{"id":"brisket-salt","amount":"2 tbsp","item":"kosher salt"},{"id":"brisket-pepper","amount":"1 tbsp","item":"black pepper"},{"id":"brisket-paprika","amount":"1 tbsp","item":"paprika"},{"id":"brisket-sugar","amount":"2 tbsp","item":"brown sugar"},{"id":"brisket-garlic","amount":"4 cloves","item":"garlic"},{"id":"brisket-onion","amount":"1","item":"onion, cut in wedges"},{"id":"brisket-coffee","amount":"1 cup","item":"strong coffee"}]$json$::jsonb,
    $json$["Salt the brisket the night before and leave it uncovered in the icebox.","Rub on the pepper, paprika, and sugar. Tuck the garlic and onion around it.","Pour the coffee into the pan, cover it, and set a slow oven before breakfast.","Leave it alone. Grandma did not baste and she did not peek.","Rest it, then slice across the grain. The coffee is the gravy."]$json$::jsonb,
    'brisket',
    0
  ),
  (
    'cast-iron-cornbread',
    'Cast-iron Cornbread',
    $note$The skillet has to be hot enough to scare you. The edges should pull away from the iron.$note$,
    '8',
    '35 minutes',
    $json$[{"id":"corn-meal","amount":"1 cup","item":"cornmeal"},{"id":"corn-milk","amount":"1 cup","item":"buttermilk"},{"id":"corn-egg","amount":"1","item":"egg"},{"id":"corn-fat","amount":"1/4 cup","item":"bacon fat"},{"id":"corn-salt","amount":"1/2 tsp","item":"salt"},{"id":"corn-powder","amount":"1 tsp","item":"baking powder"}]$json$::jsonb,
    $json$["Heat the skillet in the oven until it is almost smoking.","Stir the batter just until the dry streaks disappear.","Swirl the bacon fat in the skillet, pour, and send it back to the oven.","It is done when the edges pull from the iron and the top is chestnut."]$json$::jsonb,
    'cornbread',
    1
  ),
  (
    'peach-cobbler',
    'August Peach Cobbler',
    $note$Use the soft peaches. She froze August in bags for this and never measured twice.$note$,
    '6',
    '1 hour',
    $json$[{"id":"peach-fruit","amount":"6","item":"ripe peaches, sliced"},{"id":"peach-sugar","amount":"3/4 cup","item":"sugar"},{"id":"peach-lemon","amount":"1","item":"lemon, juiced"},{"id":"peach-butter","amount":"4 tbsp","item":"cold butter"},{"id":"peach-flour","amount":"1 cup","item":"flour"},{"id":"peach-powder","amount":"1 tsp","item":"baking powder"},{"id":"peach-milk","amount":"1/2 cup","item":"milk"}]$json$::jsonb,
    $json$["Tip the peaches, sugar, and lemon into the baker.","Dot the fruit with butter.","Spoon the batter on in islands. Do not spread it.","Bake until the juices bubble up through the crust."]$json$::jsonb,
    'cobbler',
    2
  )
on conflict (id) do nothing;
