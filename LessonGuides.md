# Lesson Guides 

## Lesson 01 Guide<a name="lesson01"></a>

### Lesson objective 
The objective of this lesson is to build understanding of the following concepts: 
- Integrated Development Environment (IDE) for writing codes. 
- The organization of source code files. 
- The structure of a source code file.   
- Running the code. 
- Viewing the output. 

### Lesson outcome
A student will be able to run the IDE (in this case `Visual Studio Code)`, be able to open the project folder, navigate to the source code, and run the code.   

### Notes for the teacher
- Please install the pre-requisite software and set up the development environment by following the `README.md` if you haven't done already.   
- Get familiar with the following skeleton code. 
- It has seven functions or methods to write code. 
- Lot of complexities are handled in the `BaseGame` class. 
- A student, new to coding, will not know the concept of class  and function. They will learn about these concepts in the subsequent lessons. So, for now, just explain that there are some placeholders in the source code where we will be writing some code to make things happen, i.e., bring our game alive!
    


```
import { BaseGame } from "../framework/BaseGame";
import { DrawingToolbox } from "../framework/DrawingToolbox";

export class Lesson01 extends BaseGame {
    initState(): void {
    }

    updateState(): void {
    }

    updateView(toolbox: DrawingToolbox): void {
    }

    handleUpArrow(): void {
    }

    handleDownArrow(): void {
    }
 
    handleLeftArrow(): void {
    }

    handleRightArrow(): void {
    }
}

```

## Lesson 02 Guide<a name="lesson02"></a>

Coming soon. 

## Lesson 03 Guide<a name="lesson03"></a>

Coming soon. 
