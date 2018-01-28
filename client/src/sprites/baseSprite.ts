import AppSprite from './appSprite'
import LifeBarSprite from './lifeBarSprite'

export default class BaseSprite extends AppSprite {

    public static readonly RADIUS: number = 120

    static loadAsset(game: Phaser.Game): void {
        game.load.image('base', 'base.png')
    }

    private readonly lifeBar: LifeBarSprite = null

    constructor(game: Phaser.Game, x: number, y: number, maxHp: number) {
        super(game, x, y, 'base')

        this.width = BaseSprite.RADIUS
        this.height = BaseSprite.RADIUS

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.lifeBar = new LifeBarSprite(this.game, 0, -this.height / 2 - 10, maxHp)
        this.addChild(this.lifeBar)
        this.showHP(maxHp)
    }

    showHP(hp: number) {
        console.log(hp)
        this.lifeBar.showHP(hp)
    }
}
