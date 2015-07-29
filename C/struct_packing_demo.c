// THIS EXERCISE IS TO DEMONSTRATE THE PADDING OF STRUCTS IN C. IN ORDER TO MAKE DATA ACCESS
// FASTER, C DATA TYPES ARE STORED IN 'ALIGNMENTS'. FOR EXAMPLE, A CHAR IS 1 BYTE, INT IS 4 BYTES
// AND A POINTER ON A 64-BIT MACHINE IS 8 BYTES. THEREFORE, THE C COMPILER WILL STORE A CHAR, INT
// STRUCT WITH 1 BYTE, 3 BYTE PADDING, AND 4 BYTES. THIS CONCEPT WILL BE USED BY THE C COMPILER
// TO QUICKLY R/W TO THESE ADDRESSES. THE IDEA OF STORING VARIABLES AT ADDRESSES DIVISBLE BY THE 
// AMOUNT OF BYTES THE DATA TYPES USE IS CALLED 'SELF-ALIGNING'. THE IDEA OF PADDING AND STRUCTURING
// THE LAYOUT OF THE DATA TYPES IN THIS WAY IS CALLED 'PACKING'. 
//      FOR MORE, VISIT: http://www.catb.org/esr/structure-packing/

// THE CONCEPTS OF SELF-ALIGNING AND PACKING APPLIES TO ALL C DATA TYPES AND STORING VARIABLES
// SEPARATELY. FOR A STRUCT IT IS A SPECIFIC CASE, WHERE THE MEMBERS OF THE STRUCT SELF-ALIGN
// TO THE WIDEST DATA TYPE CONTAINED IN THE STRUCT

#include <stdio.h>
#include <stdlib.h>

struct Address{ // Address is 208 bytes (200*2 bytes + 2*4 bytes)
  int id; // 4 bytes
  int set; // 4 bytes
  char name[100]; // 100 * 2 bytes
  char email[100]; // 100 * 2 bytes
};

// The two ints in AddressCopy pack into an 8 byte alignment. Therefore
// there is no padding in between the two int's, and the int and the char.
struct AddressCopy{ // AddressCopy is 24 bytes
  int id; // 4 bytes
  int set; // 4 bytes
  char* name; // 8 bytes
  char* email; // 8 bytes
};

struct Data{ // Data is 16 bytes
  int* x; // 8 bytes
  int y; // 4 bytes, with 4 bytes padding
};


int main(int argc, char* argv[]){
  int max_data = 100;

  printf("sizeof struct Data: %lu\n", sizeof(struct Data));

  printf("sizeof struct Address: %lu\n", sizeof(struct Address));
  printf("sizeof int: %lu\n", sizeof(int));

  printf("sizeof struct AddressCopy: %lu\n", sizeof(struct AddressCopy));
  printf("sizeof char*: %lu\n", sizeof(char*));
  printf("sizeof char: %lu\n", sizeof(char));

  printf("\n");

  // Maybe there's a better way of doing this? 
  size_t sdata = sizeof(struct AddressCopy) - 2 * sizeof(char*) + 2 * (max_data) * sizeof(char); 
  printf("sizeof struct Address calculated: %lu\n", sdata);
  
  return 0;
}
