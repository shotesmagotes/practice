## GO Tutorial

# Pointers
Go has pointers but has no pointer arithmetic. Therefore, pointer arithmetic cannot be used alongside arrays. The pointers are typically 

# Slices
Slices are references to underlying arrays. Therefore, there still exists an upper bound to the length of a slice, and this is denoted as the slice's capacity - which denotes the length made up of the array starting from the slice's first position on the underlying array to the end of the array (not end of slice). For example:

``` 
// creates a slice of length 5 and capacity 5
// underlying array is the same as slice
exampleSlice := []int{2,3,4,6,7}

// assigns a new slice taken from slice above 
// starting at index 2 - makes the capacity 3 and
// length 3
exampleSlice = exampleSlice[2:] // {4,6,7}

// assigns a new slice starting from first element
// to the second - capacity 3, length 2
exampleSlice = exampleSlice[:1] // {4,6}
```

