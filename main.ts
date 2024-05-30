function invertPixel (Schalter_M: boolean) {
    if (!(gedr_ckt) && Schalter_M) {
        gedr_ckt = true
        pixel = !(pixel)
        if (pixel) {
            basic.setLedColors(0x000000, 0x00ff00, 0x000000)
        } else {
            basic.setLedColors(0x000000, 0xff0000, 0x000000)
        }
    } else if (gedr_ckt && !(Schalter_M)) {
        gedr_ckt = false
    }
}
function Konfiguration () {
    matrix.comment("elssner/matrix-5way-63")
    matrix.comment("2 Erweiterungen:")
    matrix.comment("calliope-net/matrix")
    matrix.comment("calliope-net/dip-switch")
}
let gedr_ckt = false
let pixel = false
dipswitch.setEvent(dipswitch.dipswitch_eADDR(dipswitch.eADDR.DIP_x03), false, false)
matrix.init(matrix.ePages.y128)
matrix.displayMatrix()
basic.showNumber(dipswitch.btnCnt(dipswitch.dipswitch_eADDR(dipswitch.eADDR.DIP_x03)))
let x = 0
let y = 0
pixel = true
gedr_ckt = false
basic.forever(function () {
    basic.pause(30)
    dipswitch.readSwitch(dipswitch.dipswitch_eADDR(dipswitch.eADDR.DIP_x03))
    if (dipswitch.getON(dipswitch.eSwitch.N, dipswitch.eONOFF.ON)) {
        y += -1
    } else if (dipswitch.getON(dipswitch.eSwitch.W, dipswitch.eONOFF.ON)) {
        x += -1
    } else if (dipswitch.getON(dipswitch.eSwitch.S, dipswitch.eONOFF.ON)) {
        y += 1
    } else if (dipswitch.getON(dipswitch.eSwitch.O, dipswitch.eONOFF.ON)) {
        x += 1
    } else {
        invertPixel(dipswitch.getON(dipswitch.eSwitch.M, dipswitch.eONOFF.ON))
    }
    matrix.setPixel(x, y, pixel)
    matrix.displayMatrixChangedPages()
})
