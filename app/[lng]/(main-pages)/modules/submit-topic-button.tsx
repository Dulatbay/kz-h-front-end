import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { postPassedTopic } from "@/services/module/modulesService";
import { message } from "antd";
import Confetti from "react-confetti";

interface SubmitTopicButtonProps {
    moduleNumber: number;
    topicNumber: number;
    onSubmitSuccess?: () => void;
}

const SubmitTopicButton: React.FC<SubmitTopicButtonProps> = ({ moduleNumber, topicNumber, onSubmitSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const handleSubmit = async () => {
        if (submitted) return;

        setLoading(true);
        try {
            await postPassedTopic(moduleNumber.toString(), topicNumber.toString());
            setSubmitted(true);
            message.success("🎉 Тема успешно сдана!");
            setShowConfetti(true);

            setTimeout(() => {
                setShowConfetti(false);
                onSubmitSuccess?.();
            }, 3000);
        } catch (error) {
            message.error("Ошибка при сдаче темы. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"overflow-x-hidden"}>
            {showConfetti &&
                createPortal(
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            zIndex: 9999,
                            pointerEvents: "none",
                        }}
                    >
                        <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={500} recycle={false} />
                    </div>,
                    document.body
                )}

            <div className="relative flex flex-col items-center">
                <button
                    onClick={handleSubmit}
                    disabled={submitted || loading}
                    className={`px-6 py-3 rounded-lg text-white font-bold transition-all duration-300 
                        ${submitted ? "bg-green-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                    `}
                >
                    {loading ? "Отправка..." : submitted ? "Тема сдана! ✅" : "СДАТЬ ТЕКУЩУЮ ТЕМУ"}
                </button>
            </div>
        </div>
    );
};

export default SubmitTopicButton;
