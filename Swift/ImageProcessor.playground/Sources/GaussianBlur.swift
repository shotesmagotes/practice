import Foundation
import UIKit
import Accelerate

public class GaussianBlur: Filter {
    private static let π = M_PI
    private var width: Int?
    private var height: Int?
    private var freqchannels: DSPSplitComplex?
    
    /* Properties */
    public var IsSpectrumF: Bool {
        return false
    }
    
    public var IsSpectrumT: Bool {
        return !(IsSpectrumF)
    }
    
    /* Constructor */
    public init(rgba: RGBAImage?) {
        let channels = RGBAChannels(image: rgba!)
        width = rgba!.width
        height = rgba!.height
        
        
        /* might want to change FFT to be a ADT than a static lib */
        
        FFT.create(channels.red)
        FFT.fft2d(width!, height: height!)
        freqchannels = FFT.channel!
    }
    
    /* Methods */
    public func filter() -> UIImage{
        
        return UIImage()
    }
    
    public func setParams(params: [String : Any]) {
        
    }
    
    /* Functions */
    static func createGaussFilter(width: Float, height: Float, std: Float){
        
    }
    
    static func gaussian2d(x: Double, y: Double, std: Double) -> Float{
        let value = (1.0 / (2.0 * π * std * std)) * exp(-((x*x) + (y*y)) / (2 * std * std))
        return Float(value)
    }
}