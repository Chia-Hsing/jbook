import { useRef, useEffect } from 'react'

import './style/preview.css'

interface PreviewCode {
    code: string
    err: string
}

const html = `<html>
    <head>
    <style> html {background-color: #fff;}</style>
    </head>
    
    <body>
        <div id="root"></div>
        <script>

            const handlerError = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                console.error(err);
            }

            window.addEventListener('error', (event) => {
                event.preventDefault()  
                handlerError(event.error)
            })

            window.addEventListener('message', (event) => {
            try {
                eval(event.data);
            } catch (err) {
                handlerError(err)
            }
        }, false);
        </script>
        </body>
    </html>`

const Preview: React.FC<PreviewCode> = ({ code, err }) => {
    const iframe = useRef<any>()

    useEffect(() => {
        iframe.current.srcdoc = html
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*')
        }, 100)
    }, [code])

    return (
        <div className="preview-wrapper">
            <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
            {err && <div className="preview-error">{err}</div>}
        </div>
    )
}

export default Preview
