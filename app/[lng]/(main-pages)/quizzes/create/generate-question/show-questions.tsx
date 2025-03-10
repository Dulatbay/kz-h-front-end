import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {QuestionCard} from "@/services/question/types";
import {fetchQuestionsPaginated} from "@/services/question/questionService";
import {HttpException} from "@/utills/exceptions";
import {ConfigProvider, message, Pagination, Skeleton, theme} from "antd";

export default function ShowQuestions({handleCreateQuestion}: {
    handleCreateQuestion: (questionId: string, question: string) => void
}) {
    const dispatch = useDispatch();
    const {selectedTopics} = useSelector((state: RootState) => state.quizOptions);
    const [questions, setQuestions] = useState<QuestionCard[]>([]);
    const [pagination, setPagination] = useState({page: 1, size: 10});
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadQuestions = (page: number, size: number) => {
        setLoading(true);
        fetchQuestionsPaginated(page - 1, size, {topicIds: selectedTopics})
            .then((data) => {
                setQuestions(data.content);
                setTotalElements(data.totalElements);
                setPagination({page: data.page + 1, size});
            })
            .catch((error) => {
                if (error instanceof HttpException) {
                    message.error(error.message);
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        setPagination({page: 1, size: pagination.size});
        loadQuestions(1, pagination.size);
    }, [selectedTopics]);

    const handlePageChange = (page: number, size?: number) => {
        const newSize = size || pagination.size;
        setPagination({page, size: newSize});
        loadQuestions(page, newSize);
    };

    const questionSelected = (questionId: string, question: string) => {
        handleCreateQuestion(questionId, question);
    }

    return (
        <div>
            <h3 className="mb-2">Вопросы:</h3>
            <div className="flex flex-col gap-2">
                {loading ? (
                    Array.from({length: pagination.size}).map((_, index) => (
                        <Skeleton
                            key={index}
                            active
                            paragraph={{rows: 1}}
                            title={false}
                            className="bg-[#282828] rounded-md p-3"
                        />
                    ))
                ) : (
                    questions.map((question) => (
                        <div
                            key={question.id}
                            className="bg-[#282828] rounded-md p-3 hover:bg-zinc-600 transition-all duration-500 cursor-pointer"
                            onClick={() => questionSelected(question.id, question.question)}
                        >
                            {question.question}
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4 flex ">
                <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
                    <Pagination
                        current={pagination.page}
                        pageSize={pagination.size}
                        total={totalElements}
                        onChange={handlePageChange}
                        showSizeChanger
                    />
                </ConfigProvider>
            </div>
        </div>
    );
}
