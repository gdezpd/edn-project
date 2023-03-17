import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Input from 'antd/es/input';
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import s from './addItemForm.module.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<"" | "error" | "warning" | undefined>("")

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError("error");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== "") {
            setError("");
        }
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div className={s.wrapper}>
        <Input 
            status={error}
            placeholder={error === "" ? "Title" : "Error"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
        <Button icon={<PlusCircleOutlined />} onClick={addItem} style={{marginLeft: '5px'}}/>
    </div>
})
