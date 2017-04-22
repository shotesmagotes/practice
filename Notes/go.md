# GO Notes 

## Pointers
Go has pointers but has no pointer arithmetic. Therefore, pointer arithmetic cannot be used alongside arrays in the fashion typically found in C and C++. Go pointers are used for references to large values, such as that of structs or arrays, so that only the reference value is copied. Pointers are declared using the same notation as that found in C, and pointers to lvalues are made by using the **address of** operator.

## Slices
Slices are references to underlying arrays. Therefore, although there is no length specified in a slice declaration (in a slice definition there is with the capacity and length specified in the make built-in), there still exists an upper bound to the length of a slice, and this is denoted as the slice's capacity. The capacity of the slice denotes the length between the slice's first position on the underlying array to the end of the array (not end of slice). For example:

``` 
// creates a slice of length 5 and capacity 5
// underlying array is the same as slice
exampleSlice := []int{2,3,4,6,7}

// assigns a new slice taken from slice above 
// starting at index 2 - makes the capacity 3 and
// length 3
exampleSlice = exampleSlice[2:] // [4,6,7]

// assigns a new slice starting from first element
// to the second - capacity 3, length 1 
exampleSlice = exampleSlice[:1] // [4]
```
As you can see, the third example slice is a slice of the previous slice. The previous slice still uses the first slice's underlying array as the reference.

A slic
