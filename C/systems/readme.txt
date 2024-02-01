In some other capacity, I'd like to explore how C++ can be mapped to C.
We can use llvm to handle these translations with:

```
clang -c CPPtoC.cpp -o CPPtoC.bc -emit-llvm
clang -march=c  CPPtoC.bc -o CPPtoC.c

# older versions
llvm-g++ -c CPPtoC.cpp -o CPPtoC.bc -emit-llvm
llc -march=c  CPPtoC.bc -o CPPtoC.c
```