#!/usr/bin/make -f
#Compiles

SHELL = /bin/bash

# Add directories of other projects here...
STANFORDCPPLIB = ../StanfordCPPLib/StanfordCPPLib/

LIBS += $(STANFORDCPPLIB)

CC = c++ 
CFLAGS := $(shell \
	for lib in LIBS ; do \
					
	done
) 
LFLAGS = -L 

SRCS = $(wildcard *.c)
PROGS = $(patsubst %.c, %, $(SRCS))



all: $(PROGS)

%: %.c 
	$(CC) $(CFLAGS) 
