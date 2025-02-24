import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {ModuleResponse, TopicResponse} from "@/services/module/types";
import {setSelectedTopics} from "@/app/store/slices/quiz-slice/slice";

const {Option, OptGroup} = Select;

export default function TopicDropdown({modules}: {modules: ModuleResponse[]}) {
    const dispatch = useDispatch();
    const selectedTopics = useSelector((state: RootState) => state.quizOptions.selectedTopics);

    const handleChange = (value: string[]) => {
        dispatch(setSelectedTopics(value));
    };

    return (
        <div className={"w-full"}>
            <label className="text-sm text-gray-300 block">Select Topics</label>
            <Select
                mode="multiple"
                placeholder="Select topics"
                value={selectedTopics}
                onChange={handleChange}
                style={{width: "100%"}}
                tagRender={() => <></>}
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
