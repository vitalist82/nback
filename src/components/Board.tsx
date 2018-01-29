import * as React from "react";

export class Board extends React.Component<{}, {}> {
    render() {
        return(
            <div className={'board'}>
                <div className={'row-0'}>
                    <div className={'square-0'}></div>
                    <div className={'square-1'}></div>
                    <div className={'square-2'}></div>
                </div>
                <div className={'row-1'}>
                    <div className={'square-3'}></div>
                    <div className={'square-4'}></div>
                    <div className={'square-5'}></div>
                </div>
                <div className={'row-2'}>
                    <div className={'square-6'}></div>
                    <div className={'square-7'}></div>
                    <div className={'square-8'}></div>
                </div>
            </div>);
    }
}