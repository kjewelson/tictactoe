import { useState } from "react";


export default function GameBoard({OnSelectSquare, board}){

    

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleGameBoard(rowIndex, colIndex){
    //           setGameBoard((prevGameBoard) => {
    //         const updatedBoard = prevGameBoard.map(innerArray => [...innerArray]);
    //             updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //             return updatedBoard;
    //         });

            
    // OnSelectSquare();
    // }

    

    return(
        
        <ol id="game-board">
            {
               board.map((row,rowIndex) =>(
            
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={()=> OnSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!=null}>{playerSymbol} </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>


        // <ol id="game-board">
        //     <li>
        //         <ol>
        //             <li><button>X</button></li>
                        
        //             <li><button>X</button></li>
                        
        //             <li><button>X</button></li>
        //         </ol>
        //     </li>
        // </ol>
        );
}