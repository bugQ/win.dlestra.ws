class WorldBehavior extends Sup.Behavior
{
  awake()
  {
    Sup.Cannon.getWorld().gravity.y = -9.81;
    this.actor.cannonBody.body.type = CANNON.Body.STATIC;
  }

  update()
  {
    
  }
}
Sup.registerBehavior(WorldBehavior);
