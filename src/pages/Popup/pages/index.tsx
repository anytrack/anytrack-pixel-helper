import React from 'react';
import EventLog from '../pages/EventLog';
import HeaderLayout from "../layouts/HeaderLayout";

type Props = {
}

export const getPage = (props: any) => {
    switch (props.page) {
        default:
            return <EventLog {...props}/>
    }
}

const Popup = (props: any) => {
    return (
        <HeaderLayout>
            {getPage(props)}
        </HeaderLayout>
    );
};

export default Popup;




