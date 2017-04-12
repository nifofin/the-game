
module.exports = class Game {
  constructor (map, character, entities) {
    this.character = character
    this.entities = entities
    this.map = map

    // Temporal lines
    this.entities.hearts.forEach((heart) => heart.playAnimation())
    this.entities.coins.forEach((coin) => coin.playAnimation())
  }

  update () {
    // let action = this.getAction(keyState)
    this.character.move()
    this.checkCollisions()
  }

  checkCollisions () {
    this.entities.hearts.forEach((heart) => {
      if (!heart.animation.visible) return

      if (this.collision(this.character, heart)) {
        heart.animation.visible = false
        this.character.addHealth(1)
      }
    })
    this.entities.coins.forEach((coins) => {
      if (!coins.animation.visible) return

      if (this.collision(this.character, coins)) {
        coins.animation.visible = false
        this.character.addCoins(1)
      }
    })
  }

  collision (character, item) {
    let charPos = character.getPosition()
    let itemPos = item.getPosition()

    if (((charPos.x <= itemPos.x && charPos.x + 16 >= itemPos.x) || (charPos.x >= itemPos.x && charPos.x <= itemPos.x + 16)) &&
        ((charPos.y <= itemPos.y && charPos.y + 16 >= itemPos.y) || (charPos.y >= itemPos.y && charPos.y <= itemPos.y + 16))) {
      return true
    }
  }
}