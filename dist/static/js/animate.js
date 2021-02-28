"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var w = canvas.width = innerWidth;
  var h = canvas.height = innerHeight;
  var particles = [];
  var properties = {
    bgColor: 'rgba(17, 17, 19, 0.7)',
    particleColor: 'rgb(147, 153, 147)',
    particleRadius: 3,
    particleCount: window.innerWidth > 450 ? 60 : 20,
    particleMaxVelocity: 0.5,
    lineLength: window.innerWidth > 450 ? 150 : 90,
    particleLife: 6
  };
  document.querySelector('.animate').appendChild(canvas);

  window.onresize = function () {
    w = canvas.width = innerWidth, h = canvas.height = innerHeight;
  };

  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  var Particle = /*#__PURE__*/function () {
    function Particle() {
      _classCallCheck(this, Particle);

      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
    }

    _createClass(Particle, [{
      key: "position",
      value: function position() {
        this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
        this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
    }, {
      key: "reDraw",
      value: function reDraw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }, {
      key: "reCalculateLife",
      value: function reCalculateLife() {
        if (this.life < 1) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
          this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
          this.life = Math.random() * properties.particleLife * 60;
        }

        this.life--;
      }
    }]);

    return Particle;
  }();

  function reDrawBackground() {
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  function drawLines() {
    var x1, y1, x2, y2, length, opacity;

    for (var i in particles) {
      for (var j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = '0.3';
          ctx.strokeStyle = 'rgba(147, 153, 147, ' + opacity + ')';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (var i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  function init() {
    for (var i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }

    loop();
  }

  init();
})();