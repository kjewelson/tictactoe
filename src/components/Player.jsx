import { useState } from "react"

export default function Player({initialName, symbol, isActive,onChangeName }){

    
    const [isEditing,setIsEditing] = useState(false);
    const [plName,setPlName] = useState(initialName);

    let playerName = <span className="player-name">{plName}</span> ;
    
    function handleEditClick()
    {
        setIsEditing((editing)=>(!editing));
        if(isEditing){
        onChangeName(symbol, plName);
        }
    }
    function handleNameChange(event)
    {
        setPlName(event.target.value);
    }
    if(isEditing)
    {
        playerName = <input type="text" required value={plName} onChange={handleNameChange}></input>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>

    )
} 