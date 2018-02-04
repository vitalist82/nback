import * as React from "react";

export class BoardSquare extends React.Component<IBoardSquareProps> {

    render() {
        let className = `square square-${this.props.index} ${this.props.highlighted ? 'highlighted' : ''}`;

        return(
            <div className={className}>
                <div className={'inner-square'}></div>
            </div>
        );
    }
}

interface IBoardSquareProps {
    index:number;
    highlighted:boolean;
}