import * as React from "react";
import * as ReactDOM from "react-dom";

import "./header.scss";

export const Header: React.SFC<IHeaderProps> = (props) => {
    return <div className={'header'}><h1 className={'header-title'}>{props.title}</h1></div>;
}

interface IHeaderProps {
    title:string;
}