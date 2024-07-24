## src/App.tsx

This is the main file
I am using useRef for Board object because it should not change on renders
The board (state array) expects an Number array where

-   0 means empty square
-   1 means white piece
-   2 means black piece
-   3 means white queen
-   4 means black queen
-   -5 or -6 means capturing sqare

### Function HandleClick

Main insights:

-   Firstly I am checking if I am capturing a piece
-   Then i show all moves if it is a capturing piece clicked
-   if the square clicked is -6 means that a selected piece ant to move to here
-   Basically tge same thing happebs with the normal click
-   I am using else if because if caputuring.length is greater than 0 you must only click the pieces on that array
-   After moving i must check the game staus

### function DrawBoard

Draws tge board and highlight the forced moves (check the if statement) or the piece capturing (activePiece)

## src/Game.ts

TODO: Improve the null | type because it increases the code
attr activePiece: Hold the piece that the user clicked (capturing or moving)
attr moves: Contains all the possible moves for active Piece

### method getMoves:

first set the previously selected moves to 0 (beacuse they were -5 in other words marked green )
get the moces fron the piece method
set the moves to their respective status (normal move -5 capture move -6)

### method capture:

Handle the capture logic, check if i can really capture then caprure the piece
Check if this after the capture can capture again to force the user to do the next capture

### method gameStatus:

the game is over only when my enemy cant move or capture a piece or if i have captured all of his pieces

## src/Piece.ts

TODO: Make the verification of team, move direction on initialization

implements the piece logic
Can move if the space is available
can capture if i am capturing my enemy and the space if available
The captured piece is always in the middle because I am a normal piece
\_ _ Move Here
_ Enemy
Piece

## src/Queen.ts

Every thing for piece but now i am looking in the entire row
the captured piece is the piece that i can capture
I am calulating the direction that my enemy is based on kur coords

      _             enemy
      _

\_( Queen rhis.x this.y )
