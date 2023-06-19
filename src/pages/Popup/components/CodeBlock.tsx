import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atelierDuneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
    eventSnippet: string
}

const CodeBlock: React.FC<Props> = (props: any) => {
    return (
        <SyntaxHighlighter
            language="javascript"
            style={atelierDuneLight}
            wrapLongLines={true}
            className={"content-text"}
        >
            {props.eventSnippet}
        </SyntaxHighlighter>
    );
}

export default CodeBlock