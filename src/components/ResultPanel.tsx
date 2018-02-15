import * as React from "react";
import * as ReactDOM from "react-dom";

import "./resultPanel.scss";
import { GameResult } from "../valueObjects/gameResult";

export const ResultPanel: React.SFC<IResultPanelProps> = (props) => {
    if (props.result == null)
        return null;
    
    return(
        <div className={'result-panel'}>
            <div className={'audio'}>
                <span className={'label'}>Audio match: </span><span className={'value'}>{props.result.audioMatchPercentage + '%'}</span>
            </div>
            <div className={'position'}>
                <span className={'label'}>Position match: </span><span className={'value'}>{props.result.positionMatchPercentage + '%'}</span>
            </div>
            <div className={'total'}>
                <span className={'label'}>Total: </span><span className={'value'}>{props.result.generalMatchPercentage + '%'}</span>
            </div>
        </div>
    );
}

interface IResultPanelProps {
    result:GameResult;
}