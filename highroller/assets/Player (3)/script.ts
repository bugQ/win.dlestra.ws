class PlayerBehavior extends Sup.Behavior
{
  body : CANNON.Body;
  plane : Sup.Math.Plane;
  upImpulse : CANNON.Vec3;
  camera : Sup.Camera;
  target : Sup.Math.Vector3;
  win : Sup.Actor;
  lose : Sup.Actor;  

  awake()
  {
    this.body = this.actor.cannonBody.body;
    this.body.type = CANNON.Body.DYNAMIC;
    
    this.plane = new Sup.Math.Plane(Sup.Math.Vector3.up(), this.body.position.y);
    
    this.upImpulse = new CANNON.Vec3(0, 5, 0);
    
    this.camera = Sup.getActor("camera").camera;
    this.target = Sup.getActor("target").getPosition();
    this.win = Sup.getActor("win");
    this.lose = Sup.getActor("lose");
  }

  update()
  {
    if (this.body.position.y < -2)
    {
        if (!this.lose.getVisible())
        {
          this.lose.setVisible(true);
        }
        if (Sup.Input.wasMouseButtonJustPressed(0))
        {
          Sup.loadScene("start");
        }
    }
    if (this.body.velocity.almostZero(1e-3))
    {
      if (this.actor.getPosition().distanceTo(this.target) < 1.0)
      {
        if (!this.win.getVisible())
        {
          this.win.setVisible(true);
          Sup.log("WIN");
        }
        if (Sup.Input.wasMouseButtonJustPressed(0))
        {
          Sup.loadScene("start");
        }
      }
      else if (Sup.Input.wasMouseButtonJustPressed(0))
      {
        var localFaces =
            [  CANNON.Vec3.UNIT_Y
             , CANNON.Vec3.UNIT_Z
             , CANNON.Vec3.UNIT_X
             , CANNON.Vec3.UNIT_X.negate()
             , CANNON.Vec3.UNIT_Z.negate()
             , CANNON.Vec3.UNIT_Y.negate()
            ];
        var worldFaces = localFaces.map((face) => this.body.pointToWorldFrame(face), this);
        var upFace = worldFaces.reduce((prev, curr) => curr.y > prev.y ? curr : prev);
        var roll = worldFaces.indexOf(upFace) + 1;
        
        Sup.log("roll: ", roll);
        
        var ray = new Sup.Math.Ray().setFromCamera(this.camera, Sup.Input.getMousePosition());
        var {point} = ray.intersectPlane(this.plane);
        var dir = point.subtract(this.body.position).normalize();
        var impulse = new CANNON.Vec3(dir.x, dir.y, dir.z).mult(3 * roll).vadd(this.upImpulse);
        this.body.applyImpulse(impulse, this.body.position);
      }
    }
  }
}
Sup.registerBehavior(PlayerBehavior);
