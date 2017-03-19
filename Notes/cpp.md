# C++ Notes

## Contents
* [Programming Abstractions in C++](#progabs)


## <a name="progabs">Programming Abstractions in C++ By Roberts and Zelenski</a>

### Functions 
Calling functions with arguments that are passed by reference are not equivalent to using pointer arguments. For one, pointer arguments automatically checks for NULL values, where a pointer given a value 0 is considered a NULL pointer. The pass by reference becomes necessary when overloading operators and defining copy constructors.

### Strings


Include string.h for use of strings in code. `string.c_str()` function allows you to convert a string object into a c string equivalent to a char array.

 
