'use strict';

import Stage from './Rendering/Stage.js';
import Sprite from './Rendering/Sprite.js';
import ShipSprite from './Sprites/ShipSprite.js';
import HeroShipSprite from './Sprites/HeroShipSprite.js';
import ExhaustFlame from './Sprites/ExhaustFlame.js';
import Ship from './GameObjects/Ship.js';
import Game from './GameEngine/Game.js';
import Stars from './Sprites/Stars.js';

var stage = new Stage('galaga', 450, 800);
//stage.scale(Stage.FIT);

//var stars =  new Stars(450, 800);

Sprite.DEBUG = true;

var ship1sp = new ShipSprite(80, 80);
ship1sp.x = 50;
ship1sp.y = 200;

var exhaust = new ExhaustFlame(20, 20);


var heroShipSp = new HeroShipSprite(80, 80);

heroShipSp.x = 310;
heroShipSp.y = 50;

//stage.addChild(stars);
stage.addChild(ship1sp);
ship1sp.addChild(exhaust);
stage.addChild(heroShipSp);



var game = new Game(stage);
var ship1 = new Ship(ship1sp);
var heroShip = new Ship(heroShipSp);
//ship2.v = {x:1, y:2}; 
game.add(ship1);
game.add(heroShip);


game.startGameLoop();
 