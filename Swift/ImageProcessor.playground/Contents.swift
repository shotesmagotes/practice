//: Playground - noun: a place where people can play

import UIKit

let image = UIImage(named: "sample")

// Process the image!

let rgba = RGBAImage(image: image!)
let channels = RGBAChannels(image: rgba!)


FFT.create(channels.blue)
FFT.create(channels.green)
FFT.create(channels.red)
 /*
 API for filtering should give code like below:
 
    var gb = GaussianBlur(rgba: RGBAImage)
    gb.set_params(["std": 1])
    var filteredImage:RGBAImage = gb.filter()
    var image = filteredImage.toUIImage()
*/

