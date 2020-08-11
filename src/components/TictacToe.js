import React, {useState} from 'react';

let boardStateArray = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];

export default function Tictactoe() {

    let [isXTurn, setIsXTurn] = useState(true);
    let [boardState, setBoardState] = useState(boardStateArray);
    let [winningBoard, setWinningBoard] = useState({player: null, winning: false})
    function createBoard(state){
        return state.map((item, ind, rowArray) => {
            return (
            <tr key ={ind}>
            {
                item.map((el, i, arr) => {
                    return (
                        <td key= {ind +'-' + i} className={ind + '-' + i} onClick={setCellValue(el, i, ind, arr, rowArray)}>{el}</td>
                    )
                })
            }
            </tr>
            
            )
        })
    }

    function setCellValue (el, ind, rowInd, arr, rowArray) {
        return (event) => {
            if (el !== 'O' && el !== 'X'){
                let newItem = el;
                let newBoardState = [...arr];
                let newRowArray = [...rowArray];
                isXTurn ? newItem = 'X' : newItem = 'O';
                newBoardState.splice(ind, 1, newItem);
                newRowArray.splice(rowInd, 1, newBoardState);
                setIsXTurn(!isXTurn);
                getWinner(newRowArray);
            }
        }
    }

    function isEqual([cellOne, cellTwo, cellThree]){
        console.log('isequal', cellOne, cellTwo, cellThree);
        
        console.log("isEqual -> (cellOne === cellTwo === cellThree) && cellOne !== ' ' && cellThree !== ' ' && cellThree !== ' '", (cellOne === cellTwo === cellThree) && cellOne !== ' ' && cellThree !== ' ' && cellThree !== ' ')
        console.log("isEqual -> cellOne === cellTwo === cellThree", cellOne === cellTwo === cellThree)
        if ((cellOne === cellTwo && cellTwo === cellThree) && (cellOne !== ' ' && cellThree !== ' ' && cellThree !== ' ')){
            console.log(true);
            return true;
        } else {return false};
    }
    

    function hasWon(newState){
        let rowCheck = [];
        let colCheck = [[' ']];
        let state = [...newState];
        let diagCheck = [
            [state[0][0], state[1][1],state[2][2]],
            [state[0][2], state[1][1],state[2][0]]
        ];
        console.log('10', diagCheck)
        for (let row in state){
            console.log('1',row);
            rowCheck = state[row];
            console.log('2',rowCheck);
            
            for (let cell in row){
                console.log('3',cell, row, state[row[cell]]);
            }
            
        }
        
        console.log('5',rowCheck);
        if (isEqual(rowCheck)){
            return rowCheck[0];
        }
        for (let i = 0; i < state.length; i++){
            colCheck[i] = [];
            for (let j = 0; j <state[i].length; j++){
                colCheck[i][j] = state[j][i];
                console.log('4',colCheck);

            }
                
        }
        for (let col of colCheck){
            console.log('6',col);
            if (isEqual(col)){
                return col[0];
            }
        }
        for (let diag of diagCheck){
            console.log('7',diag);
            if (isEqual(diag)){
                return diag[0];
            }
        }
        return ' ';
    }
    function getWinner(newState){
        setBoardState(newState)
        let winner = hasWon(newState);
        return setWinningBoard({player: winner, winning: winner === ' ' ? false : true});

    }
    return (
        <div className='widget-tictactoe container'>
                    {winningBoard.winning === false
                    ? <table border ='1px black solid'>
                        <tbody>
                             {createBoard(boardState)}
                        </tbody>
                      </table>
                    : <div>{winningBoard.player} has won!</div>}
            
        </div>
    )
} 