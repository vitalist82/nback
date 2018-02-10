import * as React from "react";
import * as ReactDOM from "react-dom";
import { ButtonState } from "../enums/buttonState";

export class Button extends React.Component<IButtonProps, any> {
    
    render() {
        return (
            <div className={this.getClassName()}>
                <div className={'label'}>{this.props.label}</div>
            </div>
        );
    }

    private getClassName():string {
        let stateClassName = "";
        if (this.props.buttonState == ButtonState.Pressed)
            stateClassName = " pressed";
        else if (this.props.buttonState == ButtonState.Success)
            stateClassName = " success";
        else if (this.props.buttonState == ButtonState.Error)
            stateClassName = " error";
        return "button-match" + stateClassName;
    }
}

interface IButtonProps {
    label:string;
    buttonState:ButtonState;
}