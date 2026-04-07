
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './components/winning-combinations.js';  
import GameOver from './components/GameOver.jsx';
function App() {
  
  const [players, setPlayers] = useState(
    {'O': 'player1',
    'X': 'player2'}
    
  );
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];
let hasDraw = null;

let gameBoard = [...initialGameBoard.map(arr=>[...arr])];
let winner = null; 

for(const turn of gameTurns) {

  const {player, square} = turn;
  const {row, col} = square;

  gameBoard [row][col] = player;
}


for(const combination of WINNING_COMBINATIONS)
{
  const firstSqarSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSqarSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSqarSymbol = gameBoard[combination[2].row][combination[2].column];

  if(firstSqarSymbol && firstSqarSymbol === secondSqarSymbol 
    &&  secondSqarSymbol === thirdSqarSymbol)
  {
    winner = players[firstSqarSymbol];
  }

}

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) =>
  {
    
    let currentPlayer = 'X';

    if(prevTurns.length > 0 && prevTurns[0].player === 'X')
    {
      currentPlayer = 'O';  
    }
    console.log(prevTurns.length);

    const updatedTurns = [ {square: { row: rowIndex , col: colIndex } , player: currentPlayer},
                          ...prevTurns];
    return updatedTurns;
  })
  }

  if(gameTurns.length === 9 && !winner)
  {
    hasDraw = true;
  }
  
  function handleRestart()
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName)
  {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    }

    );
  }

  return (
    <main>
      <div id="game-container">
      <ol id="players" className='highlight-player'>
        
        <Player 
        initialName="player 1"
         symbol="X" 
         isActive={activePlayer==='X'}
         onChangeName={handlePlayerNameChange}></Player>
        
        <Player
         initialName="player 2"
          symbol="O"
           isActive={activePlayer==='O'}
           onChangeName={handlePlayerNameChange}>
          
        </Player>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} handleRestart = {handleRestart}></GameOver> }
      <GameBoard OnSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    
    </main>
    
  )
}

export default App
