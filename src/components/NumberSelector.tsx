import * as React from "react";
import * as ReactDOM from "react-dom";

import  "./numberSelector.scss";
import { ButtonState } from "../enums/buttonState";

export class NumberSelector extends React.Component<INumberSelectorProps, any> {

    private _selectedNumber:number;

    set selectedNumber(newValue:number) {
        if (newValue != this._selectedNumber) {
            this._selectedNumber = newValue;
            this.setState({ selectedNumber: newValue });
            this.props.onSelectedNumberChange(newValue);
        }
    }

    get selectedNumber():number {
        return this._selectedNumber;
    }

    public constructor(props:any) {
        super(props);
        this.state = { selectedNumber: props.selectedNumber };
        this._selectedNumber = props.selectedNumber;
    }

    render() {
        return (
            <div className={'n-selector'}>
                <div className={'n-selector-label'}>Select n: </div>
                <div className={'n-selector-btn'} onClick={this.onMinusClick}><div className={'n-selector-btn-img minus'}></div></div>
                <div className={'n-selector-number-label'}>{this.state.selectedNumber}</div>
                <div className={'n-selector-btn'} onClick={this.onPlusClick}><div className={'n-selector-btn-img plus'}></div></div>
            </div>
        );
    }

    onMinusClick = () => {
        if (!this.props.isDisabled && this.selectedNumber > 1)
            this.selectedNumber--;
    }

    onPlusClick = () => {
        if (!this.props.isDisabled)
            this.selectedNumber++;
    }
}

interface INumberSelectorProps {
    selectedNumber:number;
    isDisabled:boolean;
    onSelectedNumberChange:(number) => void;
}

interface INumberSelectorState {
    selectedNumber:number;
}