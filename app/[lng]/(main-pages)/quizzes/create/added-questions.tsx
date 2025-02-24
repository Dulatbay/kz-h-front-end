import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import Collapse from "@/components/Collapse/collapse";
import {removeQuestion} from "@/app/store/slices/quiz-slice/slice";
import {Question} from "@/app/[lng]/(main-pages)/quizzes/create/page";

export default function AddedQuestions() {
    const questions = useSelector((state: RootState) => state.quizOptions.questions);
    const dispatch = useDispatch();

    return (
        <Collapse name="Добавленные вопросы" id="addedQuestions" defaultOpen>
            <div className="max-h-[480px] gap-2 flex flex-col overflow-y-scroll">
                {questions.map((question: Question, index: number) => {
                    return (
                        <div
                            key={`question${index}`}
                            className="flex flex-col border border-white rounded-md p-3 relative w-[calc(100%-8px)] first:mt-2"
                        >
                            <h2>{question.question}</h2>
                            <p className="text-xs text-gray-400">
                                {
                                    question.type == "CREATE" && question.level && `Difficulty: ${question.level}`
                                }
                                {
                                    ` | Duration: ${question.durationInSeconds === -1
                                        ? "NONE"
                                        : question.durationInSeconds + " sec"}`
                                }
                            </p>

                            {question.variants.map((variant, ind) => {
                                const optionColor = variant.correct ? "bg-green-500" : "bg-white";
                                return (
                                    <div key={`option${index}-${ind}`} className="flex items-center gap-1">
                                        <i>
                                            <div className={`${optionColor} w-2 h-2 rounded-full`}></div>
                                        </i>
                                        {variant.text}
                                    </div>
                                );
                            })}
                            <button
                                onClick={() => dispatch(removeQuestion(index))}
                                className="rounded-full bg-red-600 text-white flex items-center justify-center w-4 h-4 -top-2 -right-2 absolute"
                            >
                                <svg
                                    width="12"
                                    height="10"
                                    viewBox="0 0 6 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="1.3538" y1="0.646447" x2="4.873" y2="4.16565" stroke="white"/>
                                    <line x1="1.18673" y1="4.16549" x2="4.70593" y2="0.646291" stroke="white"/>
                                </svg>
                            </button>
                        </div>
                    );
                })}
            </div>
        </Collapse>
    );
}
