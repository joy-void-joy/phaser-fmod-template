import 'phaser'
const {GameObjects, Math: {Vector2, Distance}} = Phaser

export
class Player extends GameObjects.Container
{
  body: Phaser.Physics.Arcade.Body
  /*** Reference ***/
  scene = null
  music = null
  keys = null

  /*** Constants for config ***/
  speed =
  {
    init: 150,
    walk: 150,
    run: 250,
  }
  radius = 10

  constructor(scene, music)
  {
    super(scene)
    const {speed, radius} = this

    /*** Parameter copy ***/
    this.scene = scene
    this.music = music

    /*** Physics ***/
    this.scene.physics.add.existing(this)
    this.body.setCircle(radius, -radius, -radius)
    this.body.useDamping = true
    this.body.setDrag(0.8, 0.8)
    this.body.setMaxSpeed(speed.init)
    this.setPosition(500, 500)

    /*** Input ***/
    this.keys = this.scene.input.keyboard.addKeys(
    {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      walk: 'shift',
    })

    this.keys['walk'].on('down', e => {this.body.setMaxSpeed(speed.run)})
    this.keys['walk'].on('up', e => {this.body.setMaxSpeed(speed.walk)})

    /*** Sprite ***/
    this.add(this.scene.add.circle(0, 0, radius, 0xFF0000))
  }

  preUpdate()
  {
    const {speed, x, y} = this

    // Finally, dynamically update the music based on how far of the center we are
    const area = Distance.Between(x, y, 500, 500) / (500/130)
    this.music.setParameterByName('area', area, 0)

    /*** Movement ***/
    if(this.keys['up'].isDown)
      this.body.velocity.y -= speed.run
    if(this.keys['down'].isDown)
      this.body.velocity.y += speed.run
    if(this.keys['left'].isDown)
      this.body.velocity.x -= speed.run
    if(this.keys['right'].isDown)
      this.body.velocity.x += speed.run
  }
}
