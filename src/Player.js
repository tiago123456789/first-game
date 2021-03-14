export default class Player {
    constructor(gameContext) {
        this._player = gameContext.physics.add.sprite(50, 450, 'dude');

        this._player.setBounce(0.2);
        this._player.setCollideWorldBounds(true);
        gameContext.anims.create({
            key: 'left',
            frames: gameContext.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 30,
            repeat: -1
        });

        gameContext.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 30
        });

        gameContext.anims.create({
            key: 'right',
            frames: gameContext.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 30,
            repeat: -1
        });

        gameContext.anims.create({
            key: 'jumb_left',
            frames: [{ key: 'dude', frame: 1 }],
            frameRate: 30,
            repeat: -1
        });

        gameContext.anims.create({
            key: 'jumb_right',
            frames: [{ key: 'dude', frame: 6 }],
            frameRate: 30,
            repeat: -1
        });
    }

    get() {
        return this._player;
    }

    moveLeft() {
        this._player.setVelocityX(-160);
        this._player.anims.play('left', true);
    }

    stopMove() {
        this._player.setVelocityX(0);
        this._player.anims.play('turn');
    }

    moveRigth() {
        this._player.setVelocityX(160);
        this._player.anims.play('right', true);
    }

    jump(cursors) {
        if (cursors.up.isDown && this._player.body.touching.down) {
            this._player.setVelocityY(-330)
            return;
        }

        if (cursors.left.isDown && !this._player.body.touching.down) {
            this._player.anims.play("jumb_left");
        }

        if (cursors.right.isDown && !this._player.body.touching.down) {
            this._player.anims.play("jumb_right");
        }
    }
}