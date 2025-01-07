# Executable

```
file size: 320639
page size: 4096
```

## Page Mapping

```
0x00010000-0x00043000: 51 pages of code
0x00050000-0x00059000: 09 pages of initialized data
0x00059000-0x00066000: 13 pages of uninitialized data
```

## Segments

### Code Segment

```
disk offset start: 0x12E00 (77312)
disk offset end: 0x44F97 (282519)
virtual offset start: 0x00010000
virtual offset end: 0x00042197
length: 0x32197 (205207)
paged length: 0x33000 (51*4096=208896)
extra bytes in last segment: 3689
```

### Data Segment

```
disk offset start: 0x45E00 (286208)
disk offset end: 0x4E47F (320639)
virtual offset start: 0x00050000
virtual offset end: 0x00065730
length: 0x15730 (87856)
paged length: 0x16000 (22*4096=90112)
extra bytes in last segment: 2256 (uninitialized!)
```

## MZ Header

The MZ Header starts at file offset 0x0 (0).

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|     60 | New header offset                   | 102E     | ui32 | 11792       |

## LE Header

The LE Header starts at file offset 0x2E10 (11792).

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Identifier                          | 4C45     | char | "LE"        |
|      2 | Byte order                          | 00       | ui08 | 0           |
|      3 | Word order                          | 00       | ui08 | 0           |
|      4 | Executable format level             | 00000000 | ui32 | 0           |
|      8 | CPU type                            | 0200     | ui16 | 2           |
|     10 | Target OS                           | 0100     | ui16 | 1           |
|     12 | Module version                      | 00000000 | ui32 | 0           |
|     16 | Module type flags                   | 00020000 | ui32 | 512         |
|     20 | Number of memory pages              | 3C000000 | ui32 | 60          |
|     24 | Initial object CS number            | 01000000 | ui32 | 1           |
|     28 | Initial EIP                         | 18460200 | ui32 | 149016      |
|     32 | Initial object SS number            | 02000000 | ui32 | 2           |
|     36 | Initial ESP                         | 30570100 | ui32 | 87856       |
|     40 | Memory page size                    | 00100000 | ui32 | 4096        |
|     44 | Bytes on last page                  | 7F060000 | ui32 | 1663        |
|     48 | Relocation section size             | 34FC0000 | ui32 | 64564       |
|     52 | Relocation section checksum         | 00000000 | ui32 | 0           |
|     56 | Loader section size                 | 5CFD0000 | ui32 | 64860       |
|     60 | Loader section checksum             | 00000000 | ui32 | 0           |
|     64 | Offset of object table              | C4000000 | ui32 | 196         |
|     68 | Object table records                | 02000000 | ui32 | 2           |
|     72 | Object page map offset              | F4000000 | ui32 | 244         |
|     76 | Object iterate data map offset      | 00000000 | ui32 | 0           |
|     80 | Resource table offset               | E4010000 | ui32 | 484         |
|     84 | Resource table records              | 00000000 | ui32 | 0           |
|     88 | Resident names table offset         | E4010000 | ui32 | 484         |
|     92 | Entry table offset                  | EB010000 | ui32 | 491         |
|     96 | Module directives table offset      | 00000000 | ui32 | 0           |
|    100 | Module directives table records     | 00000000 | ui32 | 0           |
|    104 | Relocation page table offset        | EC010000 | ui32 | 492         |
|    108 | Relocation record table offset      | E0020000 | ui32 | 736         |
|    112 | Imported modules name table offset  | 1FFE0000 | ui32 | 65055       |
|    116 | Imported modules count              | 00000000 | ui32 | 0           |
|    120 | Imported proc. name table offset    | 1FFE0000 | ui32 | 65055       |
|    124 | Per-page checksum table offset      | 00000000 | ui32 | 0           |
|    128 | Data page abs offset                | 002E0100 | ui32 | 77312       |
|    132 | Preload page count                  | 00000000 | ui32 | 0           |
|    136 | Non-resident names table abs offset | 00000000 | ui32 | 0           |
|    140 | Non-resident names table length     | 00000000 | ui32 | 0           |
|    144 | Non-resident names table checksum   | 00000000 | ui32 | 0           |
|    148 | Automatic data objects              | 02000000 | ui32 | 2           |
|    152 | Debug information offset            | 00000000 | ui32 | 0           |
|    156 | Debug information length            | 00000000 | ui32 | 0           |
|    160 | Preload instance pages number       | 00000000 | ui32 | 0           |
|    164 | Demand instance pages number        | 00000000 | ui32 | 0           |
|    168 | Extra heap allocation               | 00000000 | ui32 | 0           |
|    172 | ?                                   | 00000000 | ui32 | 0           |

### Object Table

The Object Table starts at file offset 0x2ED4 (11988) and contains 2 records.

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Virtual segment size                | 97210300 | ui32 | 205207      |
|      4 | Relocation base address             | 00000100 | ui32 | 0x10000     |
|      8 | Object flags                        | 45200000 | ui32 | 8261        |
|     12 | Page map index                      | 01000000 | ui32 | 1           |
|     16 | Page map records                    | 33000000 | ui32 | 51          |
|     20 | ?                                   | 00000000 | ui32 | 0           |

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Virtual segment size                | 30570100 | ui32 | 87856       |
|      4 | Relocation base address             | 00000500 | ui32 | 0x50000     |
|      8 | Object flags                        | 43200000 | ui32 | 8259        |
|     12 | Page map index                      | 34000000 | ui32 | 52          |
|     16 | Page map records                    | 09000000 | ui32 | 9           |
|     20 | ?                                   | 00000000 | ui32 | 0           |

### Object Page Map

The Object Page Map starts at file offset 0x2F04 (12036) and contains 60 records.

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | High page number                    | 0000     | ui16 | 0           |
|      2 | Low page number                     | 01       | ui08 | 1           |
|      3 | Page flags                          | 00       | ui08 | 0           |

...

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | High page number                    | 0000     | ui16 | 0           |
|      2 | Low page number                     | 3C       | ui08 | 60          |
|      3 | Page flags                          | 00       | ui08 | 0           |

### Relocation Page Table

The Relocation Page Table starts at file offset 0x2FFC (12284) and contains 60+1 records.

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Relocation record table offset      | 00000000 | ui32 | 0           |

...

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Relocation record table offset      | 3FFB0000 | ui32 | 64319       |

### Relocation Record Table

The Relocation Record Table starts at file offset 0x30F0 (12528) and contains N records. The record format is determined by the `address type` and `relocation type` values.

Records with an `address type` of 7 and a `relocation type` of 0 will have the following record format.

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Address type                        | 07       | ui08 | 7           |
|      1 | Relocation type                     | 00       | ui08 | 0           |
|      2 | Relative offset within page         | AB09     | ui16 | 2475        |
|      4 | Target segment number               | 02       | ui08 | 2           |
|      5 | Bytes at offset                     | 9486     | data | -           |

Records with an `address type` of 7 and a `relocation type` of 16 will have the following record format.

| Offset | Description                         | Bytes    | Type | Value       |
| ------ | ----------------------------------- | -------- | ---- | ----------- |
|      0 | Address type                        | 07       | ui08 | 7           |
|      1 | Relocation type                     | 10       | ui08 | 16          |
|      2 | Relative offset within page         | D602     | ui16 | 726         |
|      4 | Target segment number               | 01       | ui08 | 1           |
|      5 | Bytes at offset                     | 80F40100 | data | -           |

## References

* https://www.ecsdump.net/?page_id=1151
