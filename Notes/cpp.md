# C++ Notes

## Contents
* [Programming Abstractions in C++](#progabs)
* [C++ Programming Language](#stroustrup)

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

When reading a declaration of a variable use the right to left rule starting from the identifier of the variable. Furthermore, remember that \*, denoting a pointer, always appears on the left of a variable and reads "a pointer to", [] denotes an array appearing on the right of the identifier and reads "an array of", and () denotes a function appearing to the right of the identifier and reads "function returning". For example,

```
    int (*(*func)(char *, double))[][]
```  
Reads 'a pointer to a function expecting a `(char *, double)` returning a pointer to an array of arrays of ints'. This reading is constructed by starting at the identifier, going to the right, which hits a `)` and then reading to the left of the identifier, which reads 'a pointer to', and then looking to the right of the enclosing paranthesis, which gives the argument type for the function, and then reading to the left of the `(*func)`, that reads 'a pointer to', and then reading to the right of the enclosing outer paranthesis adjacent to the double array brackets, and then to the left again, which reads `int`. 

Therfore, in a reading, you could think of a declaration as broken up into sub-declarations, which the outer declaration is appended to, and whatever is to the right of the unit of declaration is a property of that declaration, whereas anything to the left is the connector to the next outer declaration. In the example, `(*func)` is a sub declaration declaring func as a pointer, and now the reading 'a pointer to' connects the inner sub-declaration to the innermost outer declaration. If you take `(*func)` as the variable *x*, then the innermost outer sub declaration can be seen as `*(x)(char*, double)` which declares *x* as a function expecting a `(char *, double)` and returning a pointer. Again, equating this innermost outer sub declaration to some variable *y* makes the next level sub declaration to read `int (y) [][]` which reads y is an array of arrays of ints. The int does not act as a connector because an int is a type in its own right and does not require any further clarification. 

### Strings
Include string.h for use of strings in code. `string.c_str()` function allows you to convert a string object into a c string equivalent to a char array.
You can create streams for strings as well using sstream. This allows you to act on a string as if it were a stream, and is useful for conversion from another type to a string.
 
### Complexity Analysis
Complexity analysis usually determines the worst case performance. However, there are other analysis methods as well, including average case analysis and amortized analysis. The differences in these complexity analysis of an algorithm are as follows:

1. Average-case analysis assumes certain probabilistic characters of the inputs. The average case analysis covers the performance of the algorithm as the expected value of the performance given the probability distribution of the inputs.

2. The amortized analysis provides an analysis of a sequence of execution of the algorithm in question, and averages the performance across the sequence of executions. Therefore, it does not consider a single run of the algorithm. This is useful in the cases where the algorithm has many different execution times using conditional branching and therefore one execution is not enough to determine the actual performance of the algorithm over a larger domain of inputs over a longer space of time. 

## <a name="stroustrup">The C++ Programming Language (4th Edition) By Bjarne Stroustrup</a>
### Types
The following are the *Fundamental Types*:
- Boolean type (bool)
- Character types (char, wchar_t)
- Integer types (int, long long)
- Floating-point types (double, long double)
- A type to signify absence of information (void)
From fundamental types, we can construct other types using declarator operators:
- Pointer types (\*)
- Array types ([])
- Reference types (&)
Additionally, there are the user defined types of:
- Data structures and classes
- Enumeration types for values in sets (enum and enum class)

For character types, the following exist: char, unsigned char, signed char, and wchar_t. For integer types, there are three forms: int, signed int, and unsigned int. Additionally, integer types come in four sizes: short, "plain", long, and long long. The actual sizes in bits are implementation defined. Usually long is a short-hand way for writing long int, short is a short int, long long is a long long int. 

Each variable of a specific type has an alignment requirement, the number of bytes (chars, really) that are required in between successive addresses where an object of the type can be allocated. For example, the alignrment requirement for an int is 4 bytes usually, and for a char it is 1 byte. Thus, a char can be allocated at any address, because each successive address is located a byte away. An int on the other hand will need to be at an address that is a multiple of 4. Using alignas() specifier for a declaration, a user can specify how the variable with that declaration specifier is to be aligned.

Declarations have 5 parts:
- Optional prefix specifier (static, virtual..)
- Base type (vector<double>, const int..)
- Declarator optionally including a name (p[7], n, \*(\*)[])
- Optional suffix function specifiers (const, noexcept..)
- Optional initializer or function body (={7,5,3} or {return x;})

Prefix specifier is an keyword (virtual, extern, constexpr) specifiying some non-type related attribute of what is being declared. A declarator is composed of a name and optional declarator operators:
- prefix, \*, pointer
- prefix, \*const, constant pointer
- prefix, \*volatile, volatile pointer
- prefix, &, lvalue reference
- prefix, &&, rvalue reference
- prefix, auto, function(using suffix return type)
- postfix, [], array
- postfix, (), function
- postfix, ->, returns from function


