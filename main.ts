input.onGesture(Gesture.Shake, function () {
    radio.sendString("gestolen")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "licht aan") {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    } else if (receivedString == "licht uit") {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    } else if (receivedString == "gevarenlicht aan") {
        achtergrondtaak = 1
    } else if (receivedString == "KL aan") {
        achtergrondtaak = 2
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    } else if (receivedString == "KR aan") {
        achtergrondtaak = 3
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    } else if (receivedString == "SeZ aan") {
        achtergrondtaak = 4
        music.play(music.stringPlayable("G A G A G A G A ", 120), music.PlaybackMode.LoopingInBackground)
    } else if (receivedString == "OZ aan") {
        achtergrondtaak = 5
    }
})
let achtergrondtaak = 0
achtergrondtaak = 0
radio.setTransmitPower(7)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
radio.setGroup(1)
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 5) {
        radio.sendString("botsing")
    }
})
basic.forever(function () {
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
})
control.inBackground(function () {
    while (achtergrondtaak == 1) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        basic.pause(250)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        basic.pause(250)
    }
})
