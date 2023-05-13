function findClosingBracket(str: string, openIndex: number): number | undefined {
    const stack = [];
    for (let i = openIndex + 1; i < str.length; i++) {
        if (str[i] === '(' && !isInString(str, i)) {
            stack.push(str[i]);
        } else if (str[i] === ')' && !isInString(str, i)) {
            stack.pop();
            if (stack.length === 0) {
                return i;
            }
        }
    }
    return undefined; // no closing bracket found
}

function isInString(str: string, index: number): boolean {
    let isInDoubleQuoteString = false;
    for (let i = 0; i < index; i++) {
        if (str[i] === '"' && !isEscaped(str, i)) {
            isInDoubleQuoteString = !isInDoubleQuoteString;
        }
    }

    let isInSingleQuoteString = false;
    for (let i = 0; i < index; i++) {
        if (str[i] === "'") {
            isInSingleQuoteString = !isInSingleQuoteString;
        }
    }
    return isInDoubleQuoteString || isInSingleQuoteString
}

function isEscaped(str: string, index: number): boolean {
    let count = 0;
    while (index >= 0 && str[index] === '\\') {
        count++;
        index--;
    }
    return count % 2 === 1;
}

const getEventSnippetsFromAScriptTag = (script: HTMLElement): string[] => {
    const results = []
    const reg = /AnyTrack\(/g
    let match;
    while ((match = reg.exec(script.innerHTML)) !== null) {
        const closingSnippetIndex = findClosingBracket(script.innerHTML, match.index)
        if (closingSnippetIndex)
            results.push(script.innerHTML.substring(match.index, closingSnippetIndex + 1))
    }
    return results
}
export const getEventSnippets = (): string[] => {
    const results: string[] = []
    Array.from(document.querySelectorAll('script'))
        .forEach(script => {
            const eventSnippetsFromAScriptTag = getEventSnippetsFromAScriptTag(script)
            results.push(...eventSnippetsFromAScriptTag)
        })
    return results
}