export type Position = 'start' | 'end'

@Component('org.decentraland.ballDroid')
export class ballDroid {
  transition: number = -1
  delay: number = -1 // this is a delay to stop the animation, to prevent a flickr in the transition
  position: Position = 'start'
  constructor(
    public channel: IChannel,
    public distance: number = 10,
    public speed: number = 5,
    public onReachStart?: Actions,
    public onReachEnd?: Actions
  ) {}
}

const startPosition = new Vector3(0, 0, 0)

export class ballDroidSystem {
  group = engine.getComponentGroup(ballDroid)
  update(dt: number) {
    for (const entity of this.group.entities) {
      const droid = entity.getComponent(ballDroid)
      const transform = entity.getComponent(Transform)

      const endPosition = new Vector3(0, droid.distance, 0)

      const isStart = droid.position === 'start'

      const start = !isStart ? startPosition : endPosition
      const end = !isStart ? endPosition : startPosition
      const speed = droid.speed / 20

      const animator = entity.getComponent(Animator)
      const clip = animator.getClip('LightAction')

      if (droid.transition >= 0 && droid.transition < 1) {
        droid.transition += dt * speed
        transform.position.copyFrom(
          Vector3.Lerp(start, end, droid.transition)
        )

        if (!clip.playing) {
          clip.stop()
          clip.play()
        }
      } else if (droid.transition >= 1) {
        droid.transition = -1
        droid.delay = 0
        transform.position.copyFrom(end)

        // send actions
        if (!isStart && droid.onReachEnd) {
          droid.channel.sendActions(droid.onReachEnd)
        } else if (isStart && droid.onReachStart) {
          droid.channel.sendActions(droid.onReachStart)
        }
      } else if (droid.delay >= 0 && droid.delay < 1) {
        droid.delay += dt
      } else if (droid.delay >= 1) {
        droid.delay = -1
        clip.stop()
      }
    }
  }
}
