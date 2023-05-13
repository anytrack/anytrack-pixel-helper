import React from 'react';
import EventLog from '../pages/EventLog';
import HeaderLayout from "../layouts/HeaderLayout";
import {PopupPage} from "../../../global/types/entity";
import {ATEvent} from "../../../global/types/entity/ATEvent";
import EventSnippets from "./EventSnippets";
import PixelNetworks from "./PixelNetworks";

type Props = {
    ATEventLog: ATEvent[],
    eventSnippets: string[],
    page: PopupPage
    setPage: React.Dispatch<PopupPage>,
    AId: string,
}

export const getPage = (props: Props) => {
    switch (props.page) {
        case PopupPage.EventSnippets:
            return <EventSnippets {...props} />
        case PopupPage.Pixel:
            return <PixelNetworks />
        default:
            // return <EventSnippets {...props} />
            return <EventLog {...props} />
    }
}

const PageRouter: React.FC<Props> = (props) => {
    return (
        <HeaderLayout
            {...props}
        >
            {getPage(props)}
        </HeaderLayout>
    );
};

export default PageRouter;




