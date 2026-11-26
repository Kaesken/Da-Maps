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
- `art/` holds the painted pictures shown under the rooms: roads, bridges,
  rivers and roofs. The DaMaps Editor makes them (**Make picture**) and names
  each one in its map's `art` list, so a map and its picture change together.
  Push the `.damap` and its picture in the same commit.

## The DaMaps Editor

Download the newest **DaMaps Editor** from
[Releases](https://github.com/Kaesken/Da-Maps/releases) (`DaMaps-Editor-Setup-<version>.exe`).
It installs for your Windows user, and Settings → Apps uninstalls it. Once
installed, it checks for new versions itself (Help → Check for updates) and
can update in place. Your maps, kept in `Documents\DaMaps`, are never touched
by installing, updating or uninstalling. Windows may warn that it doesn't
recognise the program, because it isn't code signed: click **More info** →
**Run anyway**.

## Getting the maps in Lichborne

Open the map panel, pick **Da'Maps**, and click **Download Da'Maps**. To pick
up changes later, click **Update** in the same view. Lichborne keeps its copy
in its own data folder and replaces it only once a new copy has downloaded
and checked out, so a failed download leaves the maps you had.

Pictures aren't part of that download (`.gitattributes` leaves `art/` out of
the zip). Lichborne fetches a map's picture the first time you open the map,
from the same commit as your maps, and keeps it until the next Update. The 🖼
button in the Da'Maps toolbar turns pictures off, and then nothing more is
downloaded.

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
- An exit's optional `surface` (`road`, `dirt`, `bridge`, `bridge-stone`,
  `river`) is what the path is drawn as in the picture, and a room's optional
  `building` name puts it under a roof: joined rooms with the same name share
  one.
- `art` lists each floor's picture: the file in `art/`, where its top-left
  corner sits in map units (`x`, `y`), its pixels per map unit (`scale`), its
  size, and a `stamp` the editor uses to tell when the picture is older than
  the map. A picture painted outside the editor (the Crossing's, by hand in
  Clip Studio) has no stamp, and the editor leaves it alone.

The file's own name doesn't matter; `file` inside it does.

## Credits

These maps started as the community Genie maps from
[GenieClient/Maps](https://github.com/GenieClient/Maps), exported on
2026-11-23 exactly as Da'Maps showed them, with each town's side maps folded
in. Thanks to everyone who drew and kept those maps up to date. They are
maintained here by Damiza, who also made the brushes the pictures are painted
with and painted the Crossing's picture by hand.
