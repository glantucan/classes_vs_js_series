'use strict';
import Stage from './Rendering/Stage.js';
import ShipSprite from './Sprites/ShipSprite.js';
import HeroShipSprite from './Sprites/HeroShipSprite.js';
import Ship from './GameObjects/Ship.js';
import Game from './GameEngine/Game.js';
import Stars from './Sprites/Stars.js';

var stage = new Stage('galaga', 450, 800);
stage.scale(Stage.FIT);

var stars =  new Stars()
var ship1sp = new ShipSprite(true);
var heroShipSp = new HeroShipSprite(true);
ship1sp.x = 50;
ship1sp.y = 200;
heroShipSp.x = 310;
heroShipSp.y = 50;

//stage.addChild(stars);
stage.addChild(ship1sp);
stage.addChild(heroShipSp);

var game = new Game(stage);
var ship1 = new Ship(ship1sp, 30, 45);
var heroShip = new Ship(heroShipSp, 80, 80);
//ship2.v = {x:1, y:2}; 
game.add(ship1);
game.add(heroShip);


game.startGameLoop();
