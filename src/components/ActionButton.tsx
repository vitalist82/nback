import * as React from "react";
import * as ReactDOM from "react-dom";
import { ButtonState } from "../enums/buttonState";
import { ButtonBase, IButtonBaseProps } from "./ButtonBase";

export class ActionButton extends ButtonBase<IActionButtonProps> {

    getClassName():string {
        let stateClassName = '';
        if (this.props.buttonState == ButtonState.Pressed)
            stateClassName = 'pressed';
        else if (this.props.buttonState == ButtonState.Success)
            stateClassName = 'success';
        else if (this.props.buttonState == ButtonState.Error)
            stateClassName = 'error';
        return `${this.props.className} button-match ${stateClassName}`;
    }
}

interface IActionButtonProps extends IButtonBaseProps {
    buttonState:ButtonState;
}