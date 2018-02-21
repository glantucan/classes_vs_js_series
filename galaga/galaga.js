'use strict';
import Stage from './Rendering/Stage.js';
import ShipSprite from './Sprites/ShipSprite.js';
import Ship from './GameObjects/Ship.js';
import Game from './GameEngine/Game.js';
import Stars from './Sprites/Stars.js';

var stage = new Stage('galaga', 450, 800);
stage.fillWindow(9/16);

var stars =  new Stars()
var ship1sp = new ShipSprite(true);
var ship2sp = new ShipSprite(true);
ship1sp.x = 50;
ship1sp.y = 200;
ship2sp.x = 410;
ship2sp.y = 50;

//stage.addChild(stars);
stage.addChild(ship1sp);
stage.addChild(ship2sp);

var game = new Game(stage);
var ship1 = new Ship(ship1sp, 30, 45);
var ship2 = new Ship(ship2sp, 80, 120);
//ship2.v = {x:1, y:2}; 
game.add(ship1);
game.add(ship2);


game.startGameLoop();
