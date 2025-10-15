
# File formats

This folder contains documentation for the different versions of the file format used to import and export recipes. Recipes are stored as binary files in a string of different types of data.

## Data types

There are three different types of data, which are outlined below.

### Fixed bytes

A fixed-length string of bytes that is always encoded the same and checked against when decoded. If the decoded bytes don't match the expected bytes, processing the file should fail. This feature is used at the start of the file to verify the file contains a recipe.

In the documentation this type is indicated using a table with the expected bytes in the first row (in hexadecimal) and a description of the data in the second row. Suppose we want to encode the bytes `0x4849` (this is two bytes), which form the ascii characters "HI". This is denoted as follows:

| `48` `49` |
| - |
| HI |

### Integers

An integer of any (fixed) number of bytes can be stored. They can be both signed and unsigned, and are stored in little-endian. We will denote this in the table with **u\[bytes\]** if the int is unsigned and **i\[bytes\]** if the int is signed. The bottom row again contains a description of the data. As an example consider a 4-byte unsigned int representing a length. This is written as

| u4 |
| - |
| length |

### Strings

A string is encoded using UTF-8 with a null byte at the end. This is written with **s** in the top row of the table and a description at the bottom. Note that strings are variable-length. Suppose we want to encode a string containing a title of some sort, we write this as

| s |
| - |
| title |

### No data

For the sake of convenience we write an **n** at the top of the table if there is no data to be read. This is equivalent to **b0**.

| n |
| - |
| No data |

## Documentation format

The documentation contains a list of table mixed with explanations about the data. The tables contain the data formats from left to right, as described above. 

### Example

For example if we want to encode a 2-byte (16-bit) unsigned int, followed by a string, we would use a table

| u2 | s |
| - | - |
| description of int | description of str |

### Referring to tables

Additionally, a table entry can also refer to another table (or a section with multiple tables read after each other). This will be indicated using [#example](#example) in the top row of the table. For example, we can encode the binary string `0x4849` followed by the example table above as

| `48` `49` | [#example](#example) |
| - | - |
| HI  | Example section  |

### Looping data

If we want to indicate that a specific column in the table should be read a certain number of times, we write **\[x\]** after the text in the top column. For example, if we want to encode that 16 8-byte signed integers should be read, followed by the example table twice, we write

| i8\[16\] | [#example](#example)\[2\] |
| - | - |
| Lots of integers | Examples |

We could also refer to a previous entry in the table for the number of times somethign should be repeated by referring to its description. This is written as

| u2 | [#example](#example)\[n\] |
| - | - |
| n | Variable number of examples |

### Conditional data

Lastly, we denote conditional selection of data using the top row of the table. Suppose we want to encode a 2-byte unsigned int followed by a string if this int is equal to 0 and nothing otherwise. We would write:

| u2 | s (if n=0) n (otherwise) |
| - | - |
| n | content |

### Reading the entire file

The entire file is described by the table at the top. It can be read without the text between the table, though this text is present as clarification.