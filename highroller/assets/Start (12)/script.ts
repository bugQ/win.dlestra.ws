class StartBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if (Sup.Input.wasMouseButtonJustPressed(0))
    {
      Sup.loadScene("hill");
    }
  }
}
Sup.registerBehavior(StartBehavior);
