import React, { useState, useEffect } from 'react';
import treeData from '../../../public/docs-list.json';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
interface node {
    type: string;
    name: string;
    children: node[];
    path: string;
}

export default function LeftSidebar({ onArticleSelect }: { onArticleSelect: (Pathn: string) => {} }) {
    const [tree, setTree] = useState<any>(treeData);

    useEffect(() => {


    }, []);
    const selectNode = (articlePath: string) => {

        onArticleSelect(articlePath);


    }
    const renderTree = (node: node) => {
        if (node.type === 'file') {
            // const parsedContent = remark().parse(node.content);
            // Here you can use the parsedContent with any remark plugin or 
            // custom renderer to display the content in desired format
            return (
                <TreeItem onClick={() => { selectNode(node.path) }} key={node.name} nodeId={node.name} label={node.name}>
                </TreeItem>
            );
        } else if (node.type === 'directory') {
            return (
                <TreeItem nodeId={node.name} key={node.name} label={node.name}>
                    {node.children.map(childNode => renderTree(childNode))}
                </TreeItem>
            );
        }
        return null;
    };

    return (
        <div>
            {tree && <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, width: 400, overflowY: 'auto' }}
            >{renderTree(tree)}</TreeView>}
        </div>
    );
}

