import { ballDroidSystem, ballDroid, Position } from './balldroid'

export type Props = {
  distance?: number
  speed?: number
  autoStart?: boolean
  onReachStart?: Actions
  onReachEnd?: Actions
}

export default class Door implements IScript<Props> {
  init() {
    engine.addSystem(new ballDroidSystem())
  }

  move(entity: Entity, newPosition?: Position, useTransition = true) {
    const droid = entity.getComponent(ballDroid)
    const isStart = droid.position === 'start'

    // compute new value
    if (newPosition === 'end') {
      if (!isStart) return
      droid.position = 'end'
    } else if (newPosition === 'start') {
      if (isStart) return
      droid.position = 'start'
    }

    // start transition
    if (useTransition) {
      if (droid.transition === -1) {
        droid.transition = 0
      } else {
        droid.transition = 1 - droid.transition
      }
    } else {
      droid.transition = 1
    }
  }

  spawn(host: Entity, props: Props, channel: IChannel) {
    const { distance, speed, autoStart, onReachStart, onReachEnd } = props

    const droid = new Entity(host.name + '-droid')
    droid.setParent(host)
    droid.addComponent(new Transform({ position: new Vector3(0, 0, 0) }))
    droid.addComponent(new GLTFShape('ballDroid/models/Droid_01/Droid_01.glb'))
    droid.addComponent(
      new ballDroid(channel, distance, speed, onReachStart, onReachEnd)
    )

    // add animation
    const animator = new Animator()
    const clip = new AnimationState('main', { looping: true })
    animator.addClip(clip)
    droid.addComponent(animator)
    clip.play()

    // handle actions
    channel.handleAction('goToEnd', () => this.move(droid, 'end'))
    channel.handleAction('goToStart', () => this.move(droid, 'start'))

    // sync initial values
    channel.request<Position>('position', position =>
      this.move(droid, position, false)
    )
    channel.reply<Position>(
      'position',
      () => droid.getComponent(ballDroid).position
    )

    // auto start platform
    if (autoStart !== false) {
      const goToEndAction: BaseAction<{}> = {
        entityName: host.name,
        actionId: 'goToEnd',
        values: {}
      }
      channel.sendActions([goToEndAction])
    }
  }
}
