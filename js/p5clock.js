let sechands = []

function setup() {
    let cnv = createCanvas(335, 335);
    cnv.parent("p5clock")
    background(255);
    angleMode(DEGREES)

    for (let i = 0; i < 60; i++) {
        sechands.push(new secondHand(i));
    }
}

function draw() {

    let seconds = second()
    let foregroundC = getComputedStyle(document.body).getPropertyValue('--foreground').trim();

    clear()
    noFill()
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = getComputedStyle(document.body).getPropertyValue('--foreground').trim();
    stroke(foregroundC)

    circle(width / 2, height / 2, width - 15)

    for (let i = 0; i < 60; i++) {
        sechands[i].draw()
        sechands[i].update(seconds)
    }
}

class secondHand {
    constructor(index) {
        this.index = index
        this.length = 0
    }

    draw() {
        push()
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = getComputedStyle(document.body).getPropertyValue('--background').trim();
        translate(width / 2, height / 2)
        strokeWeight(sin(this.index + frameCount / 10) * 2)
        rotate(this.index * 6 + frameCount / 10)
        line(0, 0, this.length, 0)
        pop()
    }

    update(currentTime) {
        if (this.index >= currentTime) {
            this.length = lerp(this.length, 0, (this.index / 1000 + 0.1))
        } else {
            this.length = max(lerp(this.length, width / 2 - 20, 0.1), 0)
        }
    }
}