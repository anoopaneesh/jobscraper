import { useRef } from "react";
import DialogBox from "../DialogBox"
import Editor from '@monaco-editor/react';
import { Box, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
const EditorDialog = (props) => {
    const { title, buttonTitle, onSubmit, defaultValue, comments } = props
    const editorValueRef = useRef("")
    const handleEditorChange = (value, event) => {
        editorValueRef.current = value
    }
    const addComments = (comments, defaultValue) => {
        if (!defaultValue.includes(comments)) {
            return `${comments}\n${defaultValue}`
        }
        return defaultValue
    }
    return <DialogBox
        size="6xl"
        title={title}
        buttonProps={{
            title: buttonTitle
        }}
        actionProps={{
            secondaryTitle: "Close",
            primaryTitle: "Save",
        }}
        openAction={(onOpen) => <Button leftIcon={<EditIcon />} onClick={onOpen}>Editor</Button>}
        onSubmit={() => { onSubmit(editorValueRef.current) }}
    >
        <Editor
            theme="vs-dark"
            height="70vh"
            width="100%"
            defaultLanguage="javascript"
            defaultValue={addComments(comments, defaultValue)}
            onChange={handleEditorChange}
            options={{
                wordWrap: "on"
            }}
        />
    </DialogBox>
}

export default EditorDialog