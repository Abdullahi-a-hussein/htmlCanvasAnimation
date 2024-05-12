const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");

const game = new SelfAvoidingRandomWalk(canvas.width, canvas.height);

animate();

function animate() {
  game.update();
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  game.draw(ctx);
  requestAnimationFrame(animate);
}
