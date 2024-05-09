let sechands = [];

let clock1 = function(p) {
    let foregroundC = getComputedStyle(document.body).getPropertyValue('--foreground').trim();
    let backgroundC = getComputedStyle(document.body).getPropertyValue('--background').trim();

    p.setup = function() {
        p.createCanvas(335, 335);
        p.background(255);
        p.angleMode(p.DEGREES);

        for (let i = 0; i < 60; i++) {
            sechands.push(new secondHand(i));
        }
    };

    p.draw = function() {
        let seconds = p.second();

        p.clear();
        p.noFill();
        p.drawingContext.shadowOffsetX = 5;
        p.drawingContext.shadowOffsetY = -5;
        p.drawingContext.shadowBlur = 10;
        p.drawingContext.shadowColor = backgroundC;
        p.stroke(foregroundC);

        p.circle(p.width / 2, p.height / 2, p.width - 15);

        for (let i = 0; i < 60; i++) {
            sechands[i].draw();
            sechands[i].update(seconds);
        }
    };

    class secondHand {
        constructor(index) {
            this.index = index;
            this.length = 0;
        }

        draw() {
            p.push();
            p.drawingContext.shadowOffsetX = 5;
            p.drawingContext.shadowOffsetY = -5;
            p.drawingContext.shadowBlur = 10;
            p.drawingContext.shadowColor = backgroundC;
            p.translate(p.width / 2, p.height / 2);
            p.strokeWeight(p.sin(this.index + p.frameCount / 10) * 2);
            p.rotate(this.index * 6 + p.frameCount / 10);
            p.line(0, 0, this.length, 0);
            p.pop();
        }

        update(currentTime) {
            if (this.index >= currentTime) {
                this.length = p.lerp(this.length, 0, (this.index / 1000 + 0.1));
            } else {
                this.length = p.max(p.lerp(this.length, p.width / 2 - 20, 0.1), 0);
            }
        }
    }
};

new p5(clock1, 'p5clock');

let clock2 = function(p) {
    p.setup = function() {
        p.createCanvas(335, 335);
    }

    p.draw = function() {
        let foregroundC = getComputedStyle(document.body).getPropertyValue('--foreground').trim();
        let backgroundC = getComputedStyle(document.body).getPropertyValue('--background').trim();

        p.background(backgroundC)
        for(let i=0; i<(p.frameCount%1000); i++){
            p.fill(foregroundC)
            p.circle(p.abs(p.sin(p.frameCount/200 + i*p.int(p.sin(p.frameCount/1000)*10))) * (p.width-15),
            p.abs(p.cos(p.frameCount/1000 + i)) * (p.height -15), 2)
        }
    }
};

new p5(clock2, 'p5clockclock');

let colorClock = function(p) {
    let walker = [];
    let colorList = ['#F21D2F', '#F27999', '#0F398C', '#107329', '#F2911B', '#0D0D0D', '#F21D2F', '#F27999', '#0F398C', '#107329', '#F2911B', '#ffffff'];

    p.setup = function() {
        p.createCanvas(335, 335);
        p.noStroke();

        for (let i = 0; i < 100; i++) {
            walker.push(new Walker());
        }
    };

    p.draw = function() {
        if (p.frameCount % 10000 === 0) {
            p.clear();
        }
        for (let i = 0; i < walker.length; i++) {
            walker[i].draw();
            walker[i].walk();
        }
    };

    class Walker {
        constructor() {
            this.color = p.random(colorList);
            this.currentRadius = p.random(p.width / 2);
            this.currentAngle = p.max(p.random(360), p.random(360));
            this.currentSize = p.min(p.random(p.width / 20), p.random(p.width / 20));
            this.radWalk = (p.random(-3, 3) + p.random(-3, 3)) / 2;
            this.angWalk = p.random(-0.03, 0.03);
            this.sizeWalk = (p.random(-3, 3) + p.random(-3, 3)) / 2;
        }
        draw() {
            p.fill(this.color);
            p.ellipse(p.width / 2 + this.currentRadius * p.cos(this.currentAngle),
                p.height / 2 + this.currentRadius * p.sin(this.currentAngle), this.currentSize);
        }
        walk() {
            if (this.currentRadius + this.radWalk < 300) {
                this.currentRadius += this.radWalk;
                this.currentAngle += this.angWalk;
            }
            if (this.currentSize + this.sizeWalk > 0 && this.currentSize + this.sizeWalk < 20) {
                this.currentSize += this.sizeWalk;
            }
            this.radWalk = (p.random(-3, 3) + p.random(-3, 3)) / 2;
            this.angWalk = p.random(-0.03, 0.03);
            this.sizeWalk = (p.random(-1, 1) + p.random(-1, 1)) / 2;
        }
    }
};

new p5(colorClock, 'p5colorclock');
