export default class Bombs {

    constructor(gameContext) {
        this._bombs = gameContext.physics.add.group();
    }

    create(player, score) {
        this._bombs.children.iterate(function (child) {
            child.disableBody(true, true);
        })
        const x = this._getXPostionToRenderBomb(player);
        new Array(this._getQuantityBombsCreate(score)).fill(" ").map(() => {
            var bomb = this._bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        });
    }

    _getXPostionToRenderBomb(player) {
        return (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    }

    _getQuantityBombsCreate(score) {
        return parseInt((score / 10) / 4);
    }


    get() {
        return this._bombs;
    }
}