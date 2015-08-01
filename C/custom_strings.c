#include <stdio.h>
#include <stdlib.h>

//GETS THE STRING LENGTH AND RETURNS SIZE_T
size_t my_strlen(const char *);

// APPENDS THE SECOND PARAM STRING TO THE FIRST PARAM STRING
void my_strcat(char *, const char *);

// FINDS THE CHARACTER IN THE GIVEN STRING
char * my_strchr(const char *, int);


size_t my_strlen(const char * s){
  size_t length = 0;
  while (*(s + length)) {  // *str === '\0' evaluates to a false in the condition
    length++;
  }

  return length * sizeof(char);
}

void my_strcat(char * s, const char * d){
  if (s == NULL) return;
  if (d == NULL) return;

  char * src = s;
  int i = 0;

  while ( *src ) {
    src ++;
  }
  
  while ( *(d + i) ) {
    *( src + i ) = *(d + i); // the ++ operator acts on the variables first, except since this is a post-increment,
    // the variable's orig value is returned and then the increment happens after, therefore, *dest++ will 
    // increment pointer dest by the size of the type it points to, save that state, return the original value
    // of dest pointer, and then so *dest will grab the value pointed to by the original dest pointer value
    i++;
  }
  *( src + i + 1 ) = '\0';
  return;
}

char * my_strchr(const char * s, int c){
  int i = 0;
  while ( *( s + i ) != c ){
    i++;
  }
  
  return (char *) s + i;
}


// FOR DEMONSTRATION PURPOSES
int main(void){
  char stringA[100] = "Hi my name is."; // 14 characters
  char stringB[100] = " Hello, nice to meet you.";
  

  size_t lengthA = my_strlen(stringA);
  printf("length of stringA = %lu\n", lengthA);

  my_strcat(stringA, stringB);
  printf("stringA = %s\n", stringA);

  char stringC[100] = " Nice to meet you too!";
  my_strcat(stringA, stringC);
  printf("stringA = %s\n", stringA);

  char * pointerC = my_strchr(stringC, 'a');
  printf("spointerC: %s\n", pointerC);

  char * pointerL = my_strchr("This is a character array", 'a');
  printf("spointerL: %s\n", pointerL);


  printf("This is pretty weird: %c\n", 3[pointerL]);
}
