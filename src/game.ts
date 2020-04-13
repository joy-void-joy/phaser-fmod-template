import 'phaser'
import {Player} from './classes/Player'
import {FMODStudio} from './main'

export
class Game extends Phaser.Scene
{
    circle = null
    keys = {}
    music = null

    constructor()
    {
      super({key: 'game'})
    }

    async preload()
    {
      const musicDesc = {val: null}
      const music = {val: null}

      FMODStudio.getEvent('event:/Music/Level 02', musicDesc)
      musicDesc.val.createInstance(music)

      this.music = music.val
    }

    create()
    {
      // Start the music here!
      this.music.start()

      this.add.existing(new Player(this, this.music))

      // Just marking the transition circles
      const radiuses = [53, 90, 130]
      radiuses.map(i => this.add.circle(500, 500, i*500/130, 0XFFFFFF, 0).setStrokeStyle(1, 0XFFFFFF))
    }

    update(time, delta)
    {
      FMODStudio.update()
    }
}

