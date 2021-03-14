export default 
class Stars {

    constructor(gameContext) {
        this._gameContext = gameContext;
        this._stars = gameContext.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this._stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
    }

    createMore() {
        this._stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        })
    }

    colliderSomeOneStart(player, start, callbackWheCollider) {
        start.disableBody(true, true);
        this._gameContext.sound.add("getstart", { loop: false }).play();
        callbackWheCollider();
    }

    get() {
        return this._stars;
    }
}