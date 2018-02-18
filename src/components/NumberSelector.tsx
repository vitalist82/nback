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
        this.state = { selectedNumber: props.defaultValue };
        this._selectedNumber = props.defaultValue;
    }

    render() {
        return (
            <div className={'n-selector'}>
                <div className={'n-selector-label'}>{this.props.label}</div>
                <div className={'n-selector-btn minus'} onClick={this.onMinusClick}><div className={'n-selector-btn-img'}></div></div>
                <div className={'n-selector-number-label'}>{this.state.selectedNumber}</div>
                <div className={'n-selector-btn plus'} onClick={this.onPlusClick}><div className={'n-selector-btn-img'}></div></div>
            </div>
        );
    }

    onMinusClick = (e:any) => {
        e.stopPropagation();
        if (!this.props.isDisabled && this.selectedNumber > this.props.min)
            this.selectedNumber--;
    }

    onPlusClick = (e:any) => {
        e.stopPropagation();
        if (!this.props.isDisabled && this.selectedNumber < this.props.max)
            this.selectedNumber++;
    }
}

interface INumberSelectorProps {
    label:string;
    defaultValue:number;
    min:number;
    max:number;
    isDisabled:boolean;
    onSelectedNumberChange:(number) => void;
}

interface INumberSelectorState {
    selectedNumber:number;
}