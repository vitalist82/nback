import * as React from "react";

import "./board.scss";
import { BoardSquare } from "./BoardSquare";

export class Board extends React.Component<IBoardProps, any> {
    
    render() {
        return(
            <div className={'board'}>
                <div className={'row'}>
                    <BoardSquare index={0} highlighted={this.isHighlightedIndex(0)}></BoardSquare>
                    <BoardSquare index={1} highlighted={this.isHighlightedIndex(1)}></BoardSquare>
                    <BoardSquare index={2} highlighted={this.isHighlightedIndex(2)}></BoardSquare>
                </div>
                <div className={'row'}>
                    <BoardSquare index={3} highlighted={this.isHighlightedIndex(3)}></BoardSquare>
                    <BoardSquare index={4} highlighted={this.isHighlightedIndex(4)}></BoardSquare>
                    <BoardSquare index={5} highlighted={this.isHighlightedIndex(5)}></BoardSquare>
                </div>
                <div className={'row'}>
                    <BoardSquare index={6} highlighted={this.isHighlightedIndex(6)}></BoardSquare>
                    <BoardSquare index={7} highlighted={this.isHighlightedIndex(7)}></BoardSquare>
                    <BoardSquare index={8} highlighted={this.isHighlightedIndex(8)}></BoardSquare>
                </div>
                <div className={'overlay'} onClick={this.props.onClicked}>Click or press space to start new game</div>
            </div>);
    }

    private isHighlightedIndex(index: number) {
        return this.props.highlightedSquareIndex == index;
    }
}

interface IBoardProps {
    highlightedSquareIndex:number;
    onClicked:() => void;
}