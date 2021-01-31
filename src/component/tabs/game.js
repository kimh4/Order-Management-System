import React from "react";
import GameTable from "../gametable"
import GameForm from "../forms/gameform";
import GameSearch from "../search/gamesearch";

const Game = () => {
    return (
        <div className='hello-world'>
            <br>
            </br>
            <h1>Game!</h1>
            <br>
            </br>
            <GameForm />
            <br>
            </br>
            <GameSearch />
            <br>
            </br>
            <GameTable />
        </div>
    )
}

export default Game;