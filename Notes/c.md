This text applies to the ANSI C standard.

# Program Structure
There may be multiple declarations in a program for a given variable, but there can only be one definition. This can make external variable declarations confusing, so consider using global (external) variables at a minimum altogether. If you need to declare a global (external) variable in a header file consider where the variable needs to be used. If the variable only needs referencing from one source file, declare the variable with a `static` prefix before the type declaration and do not declare the variable in a header file, but in the single source file that it is used. If the variable needs to be referenced from several source files, decalare the variable with an `extern` keyword in a header file, and define the variable in a single source file that includes the same header file. The static keyword provides file-only access to a global variable or global function - all C functions are declared globally and are implicitly prepended with the extern keyword by the compiler. To change this extern behavior of a function, we use the static keyword in order to change the access of the function to file-only. 

The keyword `extern` is used to declare a global function or variable for use in multiple source files via inclusion of a header file. In the case of a function, as stated above, the `extern` keyword is provided to the function declaration by default. However, for a variable, the variable declaration is provided by the `extern` keyword explicitly. That is, without the `extern` keyword, the global variable would be defined. For example:

```
int x;
extern int y;
```

would occur as 2 different statements. The first statement defines variable x whereas the second statement only declares variable y. Therefore, putting the declaration for variable y in a header file will enable the sharing of the global variable in multiple source files. However, putting the definition of variable x in a header file and including the header file into multiple source will cause compilation error because there would exist multiple compilation units with the definition for variable x, when we're only allowed one definition per variable or function.

When using header files in the compilation process, remember to use the benefit of compiling and linking in separate phases using the gcc program. This allows C programs to be recompiled by compilation unit rather than by the whole program.

# Pointers
The C declaration of pointer variables mimics the use of pointers in expressions. This is to make explicit that the unary operator * applied to the pointer is of the type that the pointer points to. For example if the declaration is:

```
int *ip;
```

Then this declaration is stating that the pointer is of type int and applying the unary operator * to ip will return an int, as it would be the case in an expression. The only valid pointer operations are additions and subtractions between pointers to integers, assignment of pointers to pointers of the same type, comparing two pointers that point to the same array, and assigning or comparing to 0. No other operations are well defined and are not legal. Pointers are very much variables, but come with 2 additional unary operators associated with them - `&` and `*`. That is, `&` is used to obtain a pointer, and `*` is used to obtain a value of the type that the pointer references. 

Recall, that a pointer and a array name is largely similar. However, an array name, which corresponds to the address of its initial element, is not a variable and may not be used in an expression in the way a variable can. For example, if the array name is *a*, then the expressions *a++* and *a=ptr* are illegal. You cannot reassign an array name, namely the address of an element to something else. Therefore, arrays should be used for modification, while pointers should be used for manipulation.

# Preprocessor
The preprocessor does not evaluate expressions in #define statements. The #define statements simply assigns a token to a C expression. Therefore, sizeof and other operators and variables may be used inside a #define statement. However, for other preprocessor statements, the preprocessor does the evaluation and so it is not possible to use C expressions within them and expect that the expression will be evaluated by the preprocessor. This means that you cannot use #if with sizeof operators and other expressions, but just to evaluate integral values and existences. (not entirely true -- will revisit later)
