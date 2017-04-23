# GO Notes

## Types
Go offers a different set of types that depart from types conventionally seen in other programming langauges. The following is a list of peculiar types or types with functionality that differ from the established perception.
### Pointers
Go has pointers but has no pointer arithmetic. Therefore, pointer arithmetic cannot be used alongside arrays in the fashion typically found in C and C++. Go pointers are used for references to large values, such as that of structs or arrays, so that only the reference value is copied. Pointers are declared using the same notation as that found in C, and pointers to lvalues are made by using the **address of** operator.

A pointer to an array still works and dereferencing such a pointer to obtain the array can be shortened to the form `a[i]`, if dereferncing to a specific element of an array. `a[i]` in this case would be equivalent to `(*a)[i]`.
### Slices
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
As you can see, the third example slice is a slice of the previous slice. All slices in the example above use the same underlying array. The underlying array has a length of 5. Therefore, the second slice has a capacity of 3 because the second slice references the third element of the original slice, which has the same structure as its underlying array. 

A slice is a data structure, a descriptor, of the underlying array. The slice data structure holds a reference (a pointer) to the first element of the slice (not the underlying array), within the underlying array. Therefore, in the above example, the first slice, which is the same as the underlying array, will contain a pointer to the first element of the underlying array. The second slice will contain a pointer to the third element of the underlying array. The slice data structure also contains the length of the slice, which is the number of elements between the indices specified when slicing another slice or array in defining this slice, and the capacity of the slice, which is as described above. 

There are three ways to create a slice - slicing an array, slicing a slice, and using the make built-in. Using the make built-in will provide you with a slice that references a zero valued underlying array. Therefore, it is a good tool to use when you would like to make a copy of a small amount of data, which was originally constructed via some slice that referenced a large underlying array. For example, in the following code, the read on the file will return a large slice referencing an entire file in memory. Without copying the small amount of data referenced, the garbage collector will not let go of the large underlying array that is the file. 

```
var digitRegExp = regexp.MustCompile("[0-9]+")

func FindDigits(filename string) []byte {
    b, _ := ioutil.ReadFile(filename)
    return digitRegExp.Find(b)
}
```
(taken from https://blog.golang.org/go-slices-usage-and-internals) 

### Interfaces
Interface types are a set of method signatures (useful for polymorphism). A value of an interface type holds any type that implements the methods defined in the interface - this definition is sensitive down to whether the type is a pointer or not. That is, if the pointer of a type defines a method defined in an interface, the pointer type is an implementation of that interface but the underlying type by itself is not an implementation of the interface. Interface values can be thought of as an abstraction above concrete types in Go. That is, an interface type describes a concrete type and a value for that concrete type, prescribed on the common methods that the types share. Two different types (struct, slice, array, primitive types) with methods of the same signature, described by an interface, all fall within the interface value.

The abstraction allows us to provide implementations of functions or composite types that deal with ambiguous types. 
