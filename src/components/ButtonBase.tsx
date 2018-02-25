import * as React from "react";
import * as ReactDOM from "react-dom";

export abstract class ButtonBase<TProps extends IButtonBaseProps> extends React.Component<TProps, any> {

    render() {
        return (
            <div className={this.getClassName()} onClick={this.props.onClicked}>
                <div className={'label'}>{this.props.label}</div>
            </div>
        );
    }

    protected getClassName():string {
        return this.props.className;
    }
}

export interface IButtonBaseProps {
    label:string;
    className:string;
    onClicked:() => void;
}