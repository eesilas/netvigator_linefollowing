function qcode () {
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
}
input.onButtonPressed(Button.B, function () {
    entmode = 4
    basic.showLeds(`
        # . . . .
        # . . . .
        # # # # .
        # . . # .
        # # # . .
        `)
})
let y2 = 0
let x2 = 0
let y1 = 0
let x1 = 0
let arrow = 0
let entmode = 0
basic.showIcon(IconNames.Snake)
let range = SuperBit.RGB_Program().range(0, 3)
SuperBit.RGB_Program().showRainbow(1, 360)
SuperBit.RGB_Program().show()
entmode = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
SuperBit.RGB_Program().setBrightness(120)
SuperBit.RGB_Program().showColor(neopixel.colors(NeoPixelColors.Green))
SuperBit.RGB_Program().show()
basic.forever(function () {
    while (entmode == 4) {
        huskylens.request()
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
            arrow = huskylens.readArrow_s(Content4.ID)
            if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
                x1 = huskylens.readeArrow(1, Content2.xOrigin)
                y1 = huskylens.readeArrow(1, Content2.yOrigin)
                x2 = huskylens.readeArrow(1, Content2.xTarget)
                y2 = huskylens.readeArrow(1, Content2.yTarget)
                if (x1 - x2 > 18) {
                    SuperBit.MotorRunDual(
                    SuperBit.enMotors.M1,
                    36,
                    SuperBit.enMotors.M3,
                    58
                    )
                    basic.showLeds(`
                        # # # . .
                        # # . . .
                        # . # . .
                        . . . # .
                        . . . . #
                        `)
                } else if (x1 - x2 > 0) {
                    SuperBit.MotorRunDual(
                    SuperBit.enMotors.M1,
                    41,
                    SuperBit.enMotors.M3,
                    53
                    )
                    basic.showLeds(`
                        # # # . .
                        # # . . .
                        # . # . .
                        . . . # .
                        . . . . #
                        `)
                } else if (x1 - x2 <= 18) {
                    SuperBit.MotorRunDual(
                    SuperBit.enMotors.M1,
                    58,
                    SuperBit.enMotors.M3,
                    36
                    )
                    basic.showLeds(`
                        . . # # #
                        . . . # #
                        . . # . #
                        . # . . .
                        # . . . .
                        `)
                } else if (x1 - x2 <= 0) {
                    SuperBit.MotorRunDual(
                    SuperBit.enMotors.M1,
                    53,
                    SuperBit.enMotors.M3,
                    41
                    )
                    basic.showLeds(`
                        . . # # #
                        . . . # #
                        . . # . #
                        . # . . .
                        # . . . .
                        `)
                } else {
                    SuperBit.MotorRunDual(
                    SuperBit.enMotors.M1,
                    40,
                    SuperBit.enMotors.M3,
                    40
                    )
                    basic.showLeds(`
                        . . # . .
                        . # # # .
                        # . # . #
                        . . # . .
                        . . # . .
                        `)
                }
            }
        }
    }
})
