import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import Link from "next/link";

const NavigationButton = ({
                              direction,
                              title,
                              subtitle,
                              onClick,
                              disabled,
                              passed,
                              nextAvailable,
                              nextPassed
                          }: {
    direction: 'prev' | 'next';
    title: string;
    subtitle: string;
    onClick: () => void;
    disabled: boolean;
    passed: boolean;
    nextAvailable?: boolean;
    nextPassed?: boolean;
}) => {
    return (
        <div className={'flex flex-col'}>
            <button
                onClick={() => onClick()}
                disabled={disabled}
                className={`flex items-center justify-between gap-4 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 h-24 max-w-80  ${
                    disabled
                        ? 'border border-dashed border-[#91898C] text-[#91898C] cursor-not-allowed'
                        : `${direction == 'prev' ? "text-white text-opacity-80  border-2 border-dashed border-[#3A3A3A] bg-[#212121]"
                            : "bg-[#094319] text-white  border border-dashed border-[#3DBA60]"}`
                }`

                }
            >
                {direction === 'prev' && (
                    <span className="text-2xl"><ArrowLeftOutlined/></span>
                )}
                <div className="flex flex-col text-left">
                    <h4 className={`text-xl font-bold line-clamp-1 ${direction == 'prev' ? 'text-opacity-80' : ''}`}>{title || 'No topic'}</h4>
                    <p className={`text-sm text-gray-400 line-clamp-1 ${direction == 'prev' ? 'text-opacity-80' : ''}`}>
                        {subtitle}
                    </p>
                    {passed && <span className="text-green-400">(Passed)</span>}
                </div>
                {direction === 'next' && (
                    <span className="text-2xl"><ArrowRightOutlined/></span>
                )}
            </button>
            {
                !nextAvailable ?
                    <span className="text-red-400">Не прошедшая тема. {}
                        {
                            ('No next topic' !== title && 'No previous topic' !== title) ?
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    onClick()
                                }} href={'#'} className={'text-blue-400'}>Просто
                                    посмотреть</Link> : ''
                        }
                    </span> :
                    (
                        nextPassed ? <></> : <span className={'text-yellow-400 text-right'}>Новая тема</span>
                    )

            }
        </div>
    );
};


export default NavigationButton;