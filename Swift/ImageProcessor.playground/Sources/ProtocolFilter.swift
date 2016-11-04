import Foundation
import UIKit

public protocol Filter {
    /**
     A flag set when we are working in the freq domain to filter
     */
    var IsSpectrumF : Bool { get }
    
    /**
     A flag set when we are working in the time domain to filter
     */
    var IsSpectrumT : Bool { get }
    
    /**
     A function that sets the parameters for the filter functions such as standard deviation
     
     - Parameters: params: A dictionary of string value pair where string is the parameter that you are
     setting for the specific filter and the values are the value for that parameter.
     */
    func setParams(params: [String: Any])
    
    /**
     A function that filters and returns a UI Image of the function
     */
    func filter() -> UIImage
}