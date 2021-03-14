import phaser, { Game } from "phaser";
import Player from "./Player";
import Stars from "./Stars";
import Bombs from "./Bombs";

class GameEngine {

    constructor() {
        this._config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };
        this._game = new Phaser.Game(this._config);
        this._platforms = null;
        this._player = null;
        this._stars = null;
        this._cursors = null;
        this._titleNamePlayer = null;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this._score = 0;
        this._scoreText = null;
        this.__bombs = null;
    }

    create() {
      
        this.add.image(400, 300, 'sky');
        this._platforms = this.physics.add.staticGroup();
        this._platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this._platforms.create(600, 400, 'ground');
        this._platforms.create(50, 250, 'ground');
        this._platforms.create(750, 220, 'ground');
        this._scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
       
        if (!this._player) {
            this._player = new Player(this);
        }
        this._titleNamePlayer = this.add.text(this._player.get().x - 20, this._player.get().y + 25, 'Player', { fontSize: '12px', fill: '#000' });

        if (!this._stars) {
            this._stars = new Stars(this)
        }

        if (!this._bombs) {
            this._bombs = new Bombs(this);
        }

        this._cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this._player.get(), this._platforms);
        this.physics.add.collider(this._stars.get(), this._platforms);
        this.physics.add.overlap(
            this._player.get(), this._stars.get(), 
            null, (player, start) => {
                this._stars.colliderSomeOneStart(player, start, () => {
                    this._score += 10;
                    this._scoreText.setText('Score: ' + this._score);
                    if (this._stars.get().countActive(true) === 0) {
                        this._stars.createMore();
                        this._bombs.create(player, this._score);
                    }
                })
            }, this);

        this.physics.add.collider(this._bombs.get(), this._platforms);
        this.physics.add.collider(this._player.get(), this._bombs.get(), () => {
            this.physics.pause();
            this._player.get().setTint(0xff0000);
            this._player.stopMove()
            const gameOver = true;
            const resetGame = this.add.text(280, 300, 'Click here to reset game', {  cursor: 'pointer', fontSize: '15px', fill: '#000' });
            resetGame.setInteractive();
            resetGame.on('pointerdown', () => { location.reload() });
            resetGame.on('pointerover', () => {  resetGame.setStyle({ fill: '#ff0'}); });
        }, null, this);
    }

    update() {

        if (this._cursors.left.isDown) {
            this._player.moveLeft();
        } else if (this._cursors.right.isDown) {
            this._player.moveRigth();
        } else {
            this._player.stopMove();
        }

        this._player.jump(this._cursors);
        if (this._titleNamePlayer) {
            this._titleNamePlayer.destroy()
            this._titleNamePlayer = this.add.text(this._player.get().x - 20, this._player.get().y + 25, 'Player', { fontSize: '12px', fill: '#000' });
        }
    }
}



new GameEngine();



