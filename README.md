# Image Tools CLI

Simple command line tool for batch image processing.

## Features

- Convert file extensions in a directory (e.g., jpg to png)
- Create PDF from sequentially numbered PNG images

## Installation

```bash
npm install
npm link  # To use commands globally
```

## Usage

### Convert file extensions

```bash
imgtools convert <directory> --from jpg --to png
```

Example:
```bash
imgtools convert ./images --from jpg --to png
```

### Create PDF from images

```bash
imgtools topdf <directory> [-o output.pdf]
```

Example:
```bash
imgtools topdf ./images -o output/result.pdf
```

Note: For PDF creation, images should be numbered sequentially (e.g., 001.png, 002.png, etc.) 