import { parse } from "@babel/parser"
import { traverse } from "@babel/types"
import { createFlowTreeBuilder } from "js2flowchart"
import { useEffect, useState } from "react"


export const convertCodeToFlowTree = (code: string, config = {}) => {
    const flowTreeBuilder = createFlowTreeBuilder({
        astParser: {
            sourceType: 'module',
            plugins: [
                'objectRestSpread',
                'classProperties',
                'asyncGenerators',
                'dynamicImport',
                'exportDefaultFrom',
                'exportNamespaceFrom'
            ]
        }
    });

    return flowTreeBuilder.build(code);
};

type NodeProp = {
    type: string;
    subType?: string;
    name: string;
    body: any[]
}

const Node: React.FC<{
    data: NodeProp
}> = ({ data: { type, subType, name, body } }) => {
    return <ul>
        <li>{name} - [{type}] - [{subType}]</li>
        <li>{body?.length > 0 ? <Nodes list={body} /> : null}</li>
    </ul>
}

const Nodes: React.FC<{
    list: NodeProp[]
}> = ({ list }) => {
    return <>{list.map((item: NodeProp, index) => {
        return <Node data={item} key={index}></Node>
    })}
    </>
}

const ShowFile: React.FC = () => {
    const [list, setList] = useState<NodeProp[]>([])
    useEffect(() => {
        fetch("/examples/react.flowed.js").then(res => {
            // fetch("/examples/test.js").then(res => {
            return res.text();
        }, err => {
            throw Error("请求失败")
        }).then(text => {
            // console.log(text)
            let ast = convertCodeToFlowTree(text, {});
            console.log(ast)
            let body: NodeProp[] = ast.body || []
            console.log(body)
            setList(body)
        })
    }, [])
    return <div>
        <Nodes list={list} />
    </div>
}
export default ShowFile