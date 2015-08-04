#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <errno.h>
#include <string.h>

#define MAX_ROWS_DEFAULT 1000
#define MAX_DATA_DEFAULT 516

struct Address {
  int id;
  int set;
  char * name;
  char * email;
};

struct Database {
  size_t max_rows;
  size_t max_data;
  struct Address * addrs;
};

struct Connection {
  FILE * file;
  struct Database * db;
};

struct Connection * db_start(char *, int);
void db_end(struct Connection *);
void db_deserialize(struct Connection *);
void db_serialize(struct Connection *);
void db_create(struct Connection *, size_t *);
void db_set(struct Connection *, int, char * []);
int parse_command(char *);
size_t * parse_create_args(int, char * []);
char ** parse_set_args(int, char * []);
int get_id(int, char * []);
void print_err(struct Connection *, const char *);

struct Connection * db_start(char * filename, int mode){
  struct Connection * conn = malloc(sizeof(struct Connection));
  conn-> db = malloc(sizeof(struct Database));

  if (mode == 1){
    conn-> file = fopen(filename, "w");
  } else {
    conn-> file = fopen(filename, "r+");
    if (conn-> file) db_deserialize(conn);
  };
  
  return conn;
}

void db_end(struct Connection * conn){
  size_t max_rows = conn-> db-> max_rows;
  size_t max_data = conn-> db-> max_data;

  if( !conn-> db-> addrs ) {
    fclose(conn-> file);
    free(conn-> db);
    free(conn);
    return;
  }

  struct Address * addr = conn-> db-> addrs;
  int i;

  for (i = 0; i < max_rows; i++){
    free(addr-> name);
    free(addr-> email);
    addr++;
  }
  free(conn-> db-> addrs);
  free(conn-> db);
  fclose(conn-> file);
  free(conn);
}

void db_deserialize(struct Connection * conn){
  if (fread( &conn-> db-> max_rows, sizeof(conn-> db-> max_rows), 1, conn-> file) != 1)
    printf("Could not load max_rows from file");
  if (fread( &conn-> db-> max_data, sizeof(conn-> db-> max_data), 1, conn-> file) != 1)
    printf("Could not laod max_data from file");
  
  conn-> db-> addrs = malloc(sizeof(struct Address) * (conn-> db-> max_rows));

  int i;
  size_t max_rows = conn-> db-> max_rows;
  size_t max_data = conn-> db-> max_data;
  struct Address * addr = conn-> db-> addrs;
  for (i = 0; i < max_rows; i++){
    if (fread( &addr-> id, sizeof(addr-> id), 1, conn-> file) != 1)
      printf("Could not load addr data id");
    if (fread( &addr-> set, sizeof(addr-> set), 1, conn-> file) != 1)
      printf("Could not load addr data set");

    addr-> name = malloc(sizeof(char) * max_data);
    addr-> email = malloc(sizeof(char) * max_data);

    if (fread( addr-> name, sizeof(char) * max_data, 1, conn-> file) != 1)
      printf("Could not load address name");
    if (fread( addr-> email, sizeof(char) * max_data, 1, conn-> file) != 1)
      printf("Could not load address email");

    addr++;
  }
}

void db_serialize(struct Connection * conn){
  rewind(conn-> file);
  if (fwrite( &conn-> db-> max_rows, sizeof(conn-> db-> max_rows), 1, conn-> file) != 1)
    printf("Could not write max rows");
  if (fwrite( &conn-> db-> max_data, sizeof(conn-> db-> max_data), 1, conn-> file) != 1)
    printf("Could not write max data");

  int i;
  size_t max_rows = conn-> db-> max_rows;
  size_t max_data = conn-> db-> max_data;
  struct Address * addr = conn-> db-> addrs;
  for (i = 0; i < max_rows; i++){
    if (fwrite( &addr-> id, sizeof(addr-> id), 1, conn-> file) != 1)
      printf("Could not write address id");
    if (fwrite( &addr-> set, sizeof(addr-> set), 1, conn-> file) != 1)
      printf("Could not write address set");

    if (fwrite( addr-> name, sizeof(char) * max_data, 1, conn-> file) != 1)
      printf("Could not write address name");
    if (fwrite( addr-> email, sizeof(char) * max_data, 1, conn-> file) != 1)
      printf("Could not write address email");
    
    addr++;
  }
}

void db_create(struct Connection * conn, size_t * maximums){
  conn-> db-> addrs = malloc(sizeof(struct Address) * maximums[0]);
  
  conn-> db-> max_rows = maximums[0];
  conn-> db-> max_data = maximums[1];

  int i;
  for (i = 0; i < maximums[0]; i++){
    struct Address addr = {.id = i, .set = 0}; 
    conn-> db-> addrs[i] = addr;
    conn-> db-> addrs[i].name = malloc(sizeof(char) * conn-> db-> max_data);
    conn-> db-> addrs[i].email = malloc(sizeof(char) * conn-> db-> max_data);
    
    conn-> db-> addrs[i].name[0] = '\0';
    conn-> db-> addrs[i].email[0] = '\0';
  }
}

void db_set(struct Connection *conn, int id, char * data[]){
  if (conn-> db-> addrs[id].set == 1) print_err(conn, "row is already set");
  struct Address * addr = &conn-> db-> addrs[id];

  addr-> name = data[0];
  addr-> email = data[1];
  addr-> set = 1;
}

int parse_command(char * action){
  char * actions[6] = { "create",
			"read", 
			"update", 
			"delete", 
			"set", 
			"list" };
  int i, cmp;

  for (i = 0; i < 6; i++){
    cmp = strcmp( actions[i], action );
    if ( cmp == 0 ){
      return (i + 1);
    }
  }
  return 0;
}

size_t * parse_create_args(int size, char * args[]){
  int i;
  size_t * maximums = malloc(2 * sizeof(size_t));
  char * temp = NULL;
  maximums[0] = 0;
  maximums[1] = 0;
 
  for(i = 0; i < size; i++){
    if (strncmp("MAX_ROWS=", args[i], 9) == 0){
      temp = args[i] + 9;
      maximums[0] = atoi(temp);
    }
    if (strncmp("MAX_DATA=", args[i], 9) == 0){
      temp = args[i] + 9;
      maximums[1] = atoi(temp);
    }
  } 
  if (maximums[0] == 0) maximums[0] = MAX_ROWS_DEFAULT;
  if (maximums[1] == 0) maximums[1] = MAX_DATA_DEFAULT;
  return maximums;
}

char ** parse_set_args(int size, char * args[]){
  int i;
  char * temp = NULL;
  char ** data = NULL;
  
  data = malloc(2 * sizeof(char *));
  *(data) = malloc(sizeof(char) * MAX_DATA_DEFAULT);
  *(data + 1) = malloc(sizeof(char) * MAX_DATA_DEFAULT);
  
  for (i = 0; i < size; i++){
    if (strncmp("NAME=", args[i], 5) == 0){
      temp = args[i] + 5;
      if (strlen(temp) > MAX_DATA_DEFAULT) return data;
      strcpy(*data, temp);
    }
    if (strncmp("EMAIL=", args[i], 6) == 0){
      temp = args[i] + 6;
      if (strlen(temp) > MAX_DATA_DEFAULT) return data;
      strcpy(*(data + 1), temp);
    }
  }
  return data;
}

int get_id(int size, char * args[]){
  int i;
  int id = -1;
  char * temp = NULL;

  for (i = 0; i < size; i++){
    if (strncmp("ID=", args[i], 3) == 0){
      temp = args[i] + 3;
      id = atoi(temp);
    }
  }
  if (id > MAX_ROWS_DEFAULT) id = -1;
  return id;
}

void print_err(struct Connection * conn, const char * message){
  if (errno) {
    perror(message);
  } else {
    printf("ERROR: %s\n", message);
  }
  if (conn) db_end(conn);

  exit(1);
}

int main(int argc, char * argv[]){
  char * action = argv[1];
  char * filename = argv[2];
  size_t * results = NULL;
  char ** data;
  int id = -1;
  int max_rows_default = MAX_ROWS_DEFAULT;
  int max_data_default = MAX_DATA_DEFAULT;

  int parsedaction = parse_command(action);
  if( parsedaction ){
    struct Connection * conn = db_start(filename, parsedaction);

    switch ( parsedaction ){
    case 1:
      results = parse_create_args(argc, argv);
      if ((results[0] > MAX_ROWS_DEFAULT) || (results[1] > MAX_DATA_DEFAULT))
	print_err(conn, "MAX_ROW or MAX_DATA beyond its limits");
      db_create(conn, results);
      db_serialize(conn);
      if (results) free(results);
      printf("Database created with %lu rows and %lu data space.\n", results[0], results[1]);
      break;
    case 2:
      if ((id = get_id(argc, argv)) == -1)
	print_err(conn, "ID is out of bounds or was not in the form of ID=<number>");
    case 5:
      data = parse_set_args(argc, argv);
      if ((id = get_id(argc, argv)) == -1)
	print_err(conn, "ID is out of bounds or was not in the form of ID=<number>");
      db_set(conn, id, data);
      db_serialize(conn);

      printf("Set row with data successfully with name: %s, email: %s\n", data[0], data[1]);

      free(data);
      break;
    }

    db_end(conn);
  }
}
