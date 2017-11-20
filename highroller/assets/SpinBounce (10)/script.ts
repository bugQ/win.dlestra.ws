class SpinBounceBehavior extends Sup.Behavior
{
  body: CANNON.Body;
  pos_tween: TWEEN.Tween;
  rot_tween: TWEEN.Tween;
  running: boolean;

  awake()
  {
    this.body = this.actor.cannonBody.body;
    this.body.type = CANNON.Body.KINEMATIC;
  }

  start_tweens()
  {
    var y = this.body.position.y + 1;
    this.pos_tween = new TWEEN.Tween(this.body.position)
      .to({y: y}, 1500)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .repeat(Infinity)
      .yoyo(true)
      .start();
    this.body.angularVelocity.y = 6;
    this.rot_tween = new TWEEN.Tween(this.body.angularVelocity)
      .to({y: -20}, 1600)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .repeat(Infinity)
      .yoyo(true)
      .start();
    this.running = true;
  }

  update()
  {
    if (!this.running)
    {
      if (this.actor.getVisible())
        this.start_tweens();
    }
    else
      TWEEN.update();
  }
}
Sup.registerBehavior(SpinBounceBehavior);
