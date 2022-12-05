/*
What fields should the API contain?

ID- Not null, primary key, non-auto-increment. Acts as Pokemon ID.
name - Varchar(30)?
ImageURL - nullable (if null, use unknown icon), URL from the github repo, later conditionally styled to hopefully fit our needs?
description - Varchar (500)
primary typing - Not null, Varchar(15). In frontend, put a selection form. Minimizes error, helps conditional styling.
secondary typing - nullable, -||-
height - NUMERIC(7,2) meters 6,2 works, so let's make it 7,2 in case they want to make some colossal big pokemon. 
weight - NUMERIC(7,2) kg
*/

CREATE TABLE IF NOT EXISTS pokemon (
    ID smallint primary key not null,
    name varchar(20),
    imgurl varchar(2083),
    description varchar(1600),
    primarytyping varchar(10) not null,
    secondarytyping varchar(10),
    height numeric(7,2),
    weight numeric(7,2)
);
INSERT INTO pokemon values (1,'bulbasaur','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite001Bulbasaur.png?raw=true','There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.', 'grass','poison',0.7,6.9);
INSERT INTO pokemon values (2,'ivysaur','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite002Ivysaur.png?raw=true','When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.','grass','poison', 1,13);
INSERT INTO pokemon values (3,'venusaur','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite003Venusaur.png?raw=true','Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.','grass','poison',2,100);
INSERT INTO pokemon values(4,'charmander','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite004Charmander.png?raw=true','It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.','fire',null,0.6,8.5);
INSERT INTO pokemon values (5,'charmeleon','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite005Charmeleon.png?raw=true','It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.','fire',null,1.1,19);
INSERT INTO pokemon values (6,'charizard','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite006Charizard.png?raw=true','It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.','fire','flying',1.7,90.5);
INSERT INTO pokemon values (7,'squirtle','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite007Squirtle.png?raw=true','When it retracts its long neck into its shell, it squirts out water with vigorous force.','water',null,0.5,9);
INSERT INTO pokemon values (8,'wartortle','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite008Wartortle.png?raw=true','It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old.','water',null,1,22.5);
INSERT INTO pokemon values (9,'blastoise','https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite009Blastoise.png?raw=true','It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.','water',null,1.6,85.5);

