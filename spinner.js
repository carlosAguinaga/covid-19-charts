
// draw();

export function spinner(ctx) {
//   var i = 0;

const ctx = document.querySelector("#myChart").getContext("2d");

  i += 0.07;

  ctx.translate(50, 50);
  ctx.rotate(0.04);
  ctx.translate(-50, -50);
  ctx.clearRect(0, 0, 100, 100);

  ctx.beginPath();
  ctx.arc(50, 50, 30, i - Math.cos(i + 90), i + Math.sin(i + 180) + 2.3);
  ctx.lineWidth = 8;
  var gradient = ctx.createLinearGradient(0, 0, 170, 0);
  gradient.addColorStop("0", "#00dbde");
  gradient.addColorStop("0.5", "#fc00ff");
  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.stroke();
  window.requestAnimationFrame(spinner);
}