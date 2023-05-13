export const getScriptInfo = () => {
    return Array.from(document.querySelectorAll('script'))
        .filter(script => {
            return true;
            return script.src !== ""
        }).map(script => {
            const result: any = {}
            Array.from(script.attributes).forEach(v => {
                result[v.name] = v.value
                // protocol-relative URL handler
                if (v.name === 'src' && v.value && v.value.startsWith('//')) {
                    result[v.name] = window.location.protocol + result[v.name]
                }
            })
            return result;
        })
}