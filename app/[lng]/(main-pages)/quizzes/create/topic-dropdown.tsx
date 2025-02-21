import {Select} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {ModuleResponse, TopicResponse} from "@/services/module/types";
import {fetchModules} from "@/services/module/modulesService";
import {setSelectedTopics} from "@/app/store/slices/quiz-slice/slice";

const {Option, OptGroup} = Select;

export default function TopicDropdown({modules}: {modules: ModuleResponse[]}) {
    const dispatch = useDispatch();
    const selectedTopics = useSelector((state: RootState) => state.quizOptions.selectedTopics);

    const handleChange = (value: string[]) => {
        dispatch(setSelectedTopics(value));
    };

    return (
        <div>
            <Select
                mode="multiple"
                placeholder="Select topics"
                value={selectedTopics}
                onChange={handleChange}
                style={{width: "100%"}}
                tagRender={() => <></>} // скрываем встроенные теги
            >
                {modules.map((module) => (
                    <OptGroup key={module.id} label={module.name}>
                        {module.topics.map((topic: TopicResponse) => (
                            <Option key={topic.topicId} value={topic.topicId} label={topic.topicName}>
                                {topic.topicName}
                            </Option>
                        ))}
                    </OptGroup>
                ))}
            </Select>
        </div>
    );
}
