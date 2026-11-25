# Da'Maps

The maps behind **Da'Maps**, the hand-drawn DragonRealms map view in
[Lichborne](https://github.com/Kaesken/lichborne). Lichborne downloads this
folder from GitHub, so a map fixed here reaches players without a new
Lichborne release.

## What's here

- `maps/` holds one `.damap` file per map, made and changed in the DaMaps
  Editor.
- `maps/index.json` lists every map with its git blob id. The DaMaps Editor
  reads it to see which maps changed. A GitHub workflow rewrites it on every
  push, or you can run `node tools/make-index.mjs` yourself.

## Getting the maps in Lichborne

Open the map panel, pick **Da'Maps**, and click **Download Da'Maps**. To pick
up changes later, click **Update** in the same view. Lichborne keeps its copy
in its own data folder and replaces it only once a new copy has downloaded
and checked out, so a failed download leaves the maps you had.

Da'Maps also needs Lich's map database, because every square on the map is
matched to a Lich room. That match is made on your computer, against your own
Lich map, each time the maps or Lich's map change.

## The .damap format

Plain JSON, one room per line, so a change reads as a normal diff.

- `file` is the map's link name. It identifies the map, and it is what
  doorways on other maps point at.
- `includes` lists the old link names of side maps folded into this one, so
  doorways to those still arrive here.
- A room's `linksTo` makes it a doorway to another map, by that map's link
  name.
- A room's optional `lich` number overrides the automatic match to a Lich
  room.

The file's own name doesn't matter; `file` inside it does.

## Credits

These maps started as the community Genie maps from
[GenieClient/Maps](https://github.com/GenieClient/Maps), exported on
2026-11-23 exactly as Da'Maps showed them, with each town's side maps folded
in. Thanks to everyone who drew and kept those maps up to date. They are
maintained here by Damiza.
