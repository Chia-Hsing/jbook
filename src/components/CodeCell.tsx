import { useState, useEffect } from 'react'

import Preview from '../components/Preview'
import bundler from '../bundler'
import CodeEditor from '../components/CodeEditor'
import Resizable from './Resizable'

const CodeCell = () => {
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(input)
            setCode(output.code)
            setErr(output.err)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [input])

    return (
        <Resizable direction="vertical">
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue="const a = 1"
                        onChange={value => {
                            setInput(value)
                        }}
                    />
                </Resizable>
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    )
}

export default CodeCell
