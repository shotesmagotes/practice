# C++ Notes

## Contents
* [Programming Abstractions in C++](#progabs)


## <a name="progabs">Programming Abstractions in C++ By Roberts and Zelenski</a>

### Functions 
Calling functions with arguments that are passed by reference are not equivalent to using pointer arguments. For one, pointer arguments automatically checks for NULL values, where a pointer given a value 0 is considered a NULL pointer. The pass by reference becomes necessary when overloading operators and defining copy constructors.

Pointers to functions are declared as follows:
```
    return-type-name (*funcName) (argument-type-name) 
```    
and using the function pointer will be as simple as calling the function with appropriate arguments as such:
```
    return-type-name value = funcName(arguments)
```
    You can use the declaration above in function prototypes and reference a function pointer.


### Strings
Include string.h for use of strings in code. `string.c_str()` function allows you to convert a string object into a c string equivalent to a char array.
You can create streams for strings as well using sstream. This allows you to act on a string as if it were a stream, and is useful for conversion from another type to a string.
 
