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
