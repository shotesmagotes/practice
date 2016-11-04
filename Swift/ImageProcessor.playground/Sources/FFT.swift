import Foundation
import Accelerate

/**
 Class that instantiates with
 */
public class FFT {
    private static var splitComplex: DSPSplitComplex?
    private static var real: [Float]?
    private static var imaginary: [Float]?
    private static var weights: FFTSetup?
    private static var isExistsInstant: Bool = false
    private static let π = M_PI
    
    public static var channel: DSPSplitComplex? {
        get {
            return splitComplex
        }
    }
    /**
     Initiates and stores passed image channel values for use with the class's static
     methods
     
     - Parameters: input: A vector of image channel's values in unsigned 8-bit values
     
     */
    public static func create(input: [UInt8]) {
        real = []
        for i in 0..<input.count {
            real!.append(Float(input[i]))
        }
        
        imaginary = [Float](count: input.count, repeatedValue: 0.0)
        splitComplex = DSPSplitComplex(realp: &real!, imagp: &imaginary!)
        
        let length = vDSP_Length(floor(log2(Float(input.count))))
        let radix = FFTRadix(kFFTRadix2)
        if !(isExistsInstant) {
            weights = vDSP_create_fftsetup(length, radix)
            isExistsInstant = true
        }
    }
    
    /**
     Takes the forward 2D fast fourier transform of the object's image
     
     - Parameters:
     - width: width of the image
     - height: height of the image
     
     - Returns: a vector of normalized magnitude values; does not include phase;
     stores the actual real and complex values into splitComplex, which is a private
     property
     */
    public static func fft2d(width: Int, height: Int) -> [Float] {
        let length0 = vDSP_Length(floor(log2(Float(width))))
        let length1 = vDSP_Length(floor(log2(Float(height))))
        let count = width * height
        
        vDSP_fft2d_zip(weights!, &splitComplex!, 1, 0, length0, length1, FFTDirection(FFT_FORWARD))
        
        var magnitudes = [Float](count: count, repeatedValue: 0.0)
        vDSP_zvmags(&splitComplex!, 1, &magnitudes, 1, vDSP_Length(count))
        
        var scale: Float = 2.0 / Float(count)
        vDSP_vsmul(sqrt(magnitudes), 1, &scale, &magnitudes, 1, vDSP_Length(count))
        
        return magnitudes
    }
    
    /**
     Takes the inverse 2D fast fourier transform of the object's frequency domain representation
     of the image
     
     - Parameters:
     - width: width of the image
     - height: height of the image
     
     - Returns: a normalized vector that contains real values of the image
     */
    public static func ifft2d(width: Int, height: Int) -> [Float] {
        guard let fftWeights = weights else { return [Float]() }
        let count = width * height
        
        let length0 = vDSP_Length(floor(log2(Float(width))))
        let length1 = vDSP_Length(floor(log2(Float(height))))
        vDSP_fft2d_zip(fftWeights, &splitComplex!, 1, 0, length0, length1, FFTDirection(FFT_INVERSE))
        
        var magnitudes = [Float](count: count, repeatedValue: 0.0)
        vDSP_zvmags(&splitComplex!, 1, &magnitudes, 1, vDSP_Length(count))
        
        var scale: Float = 1.0 / (2.0 * Float(count))
        vDSP_vsmul(sqrt(magnitudes), 1, &scale, &magnitudes, 1, vDSP_Length(count))
        
        return magnitudes
    }
    
    public static func destroy(){
        vDSP_destroy_fftsetup(weights!)
    }
    
    
    public static func sqrt(x: [Float]) -> [Float] {
        var n = Int32(x.count)
        return withUnsafePointer(&n) {
            var y = x
            vvsqrtf(&y, x, $0)
            return y
        }
    }
}