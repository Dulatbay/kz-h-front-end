import {Button} from 'antd'
import styles from '@/app/styles/ultima.module.scss'

export default function LearnPage() {
    return (
        <>
            <Head/>
            <Modules/>
        </>
    )
}

function Head(){
    let imgs = "https://www.figma.com/file/AiJWvz95uhBS2KAeVOFQfm/image/c22d071fb0fe1d988f8eb36efbb887789e183504";
    return (
        <>
            <div className="bg-[#252b32] h-80 flex justify-center items-center">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col gap-2 items-center">
                        <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0938 88.6875V36.2812C9.95544 36.2812 7.90471 37.1307 6.3927 38.6427C4.88069 40.1547 4.03125 42.2054 4.03125 44.3438V100.781C4.03125 102.92 4.88069 104.97 6.3927 106.482C7.90471 107.994 9.95544 108.844 12.0938 108.844H49.9069C42.3558 103.598 33.3819 100.785 24.1875 100.781C20.98 100.781 17.9039 99.5071 15.6359 97.2391C13.3679 94.9711 12.0938 91.895 12.0938 88.6875ZM116.906 36.2812V88.6875C116.906 91.895 115.632 94.9711 113.364 97.2391C111.096 99.5071 108.02 100.781 104.812 100.781C95.618 100.785 86.6442 103.598 79.0931 108.844H116.906C119.045 108.844 121.095 107.994 122.607 106.482C124.119 104.97 124.969 102.92 124.969 100.781V44.3438C124.969 42.2054 124.119 40.1547 122.607 38.6427C121.095 37.1307 119.045 36.2812 116.906 36.2812Z" fill="#5046E5"/>
                            <path d="M24.1875 20.1562C23.1183 20.1562 22.093 20.581 21.337 21.337C20.581 22.093 20.1562 23.1183 20.1562 24.1875V88.6875C20.1562 89.7567 20.581 90.782 21.337 91.538C22.093 92.294 23.1183 92.7188 24.1875 92.7188C36.3152 92.7314 48.0809 96.8522 57.5662 104.409L60.4688 106.747V20.8819C59.176 20.4125 57.8127 20.1672 56.4375 20.1562H24.1875ZM108.844 88.6875V24.1875C108.844 23.1183 108.419 22.093 107.663 21.337C106.907 20.581 105.882 20.1562 104.812 20.1562H72.5625C71.1873 20.1672 69.824 20.4125 68.5312 20.8819V106.747L71.4337 104.409C80.9191 96.8522 92.6848 92.7314 104.812 92.7188C105.882 92.7188 106.907 92.294 107.663 91.538C108.419 90.782 108.844 89.7567 108.844 88.6875Z" fill="white"/>
                        </svg>
                        <h1 className="text-lg"><strong>KzH</strong> Learning</h1>
                    </div>
                    <h4 className="text-base">Learn the history Module By Module and Topic By Topic.</h4>
                </div>
            </div>
            <div className="h-80 w-full flex justify-center items-center relative">
                <div className="h-20 w-full bg-[#252b32] absolute top-0 -z-10">
                    
                </div>
                <a href='#' className="w-[480px] aspect-video relative flex flex-col justify-between p-6 cursor-pointer">
                    <img src={imgs} className="w-full h-full rounded-3xl inset-0 brightness-[40%] absolute -z-10"/>
                    <h3 className="text-yellow-200 text-2xl ml-auto">
                        56%
                    </h3>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">Кыпчаки</h2>
                        <h3 className="text-sm">Тюркский период</h3>
                    </div>
                </a>
            </div>
        </>
    )
}

function Modules(){
    const modules = [
        {
            "topic": "Древний век",
            "text": "В этой главе мы рассмотрим древний Казахстан, начиная с каменного века до Тюрков. Будут затронуты периоды бронзового века, а также история народов саков и сарматов. Помимо этого, мы рассмотрим вклад Казахстана в развитие ремесел, земледелия и животноводства. Особое внимание будет уделено уникальным археологическим находкам и памятникам, которые раскроют многогранность прошлого этого удивительного региона.",
            "questionsNumber": 123,
            "duration": "14 часов",
            "usersNumber": "55.5K",
            "difficulty": 3,
            "img": "https://www.figma.com/file/AiJWvz95uhBS2KAeVOFQfm/image/319e36fb3ca2d4b20cdd3141affa76522dae185e"
        },
        {
            "topic": "Тюркский период",
            "text": "В этой главе мы перейдем к тюркскому периоду, когда тюркские племена начали активно поселяться на территории Казахстана. Раскроем роль этих племен в формировании ранних тюркских государств и их влияние на культуру и общество региона. Изучим язык и письменность тюрков, их религию и мифологию, а также важные исторические события, определившие будущее этой земли. Погрузимся в богатую и разнообразную историю древнего Казахстана, которая оставила следы в современном облике этой страны.",
            "questionsNumber": 193,
            "duration": "20 часов",
            "usersNumber": "34.5K",
            "difficulty": 4,
            "img": "https://www.figma.com/file/AiJWvz95uhBS2KAeVOFQfm/image/c22d071fb0fe1d988f8eb36efbb887789e183504",
        }
    ]
    return (
        <div className="flex flex-col w-[900px] mx-auto gap-4">
            <h2 className="text-2xl">Modules</h2>
            <div className="flex flex-col gap-10">
                {
                    modules.map((modul, i) => {
                        let difficultyArray = new Array(modul.difficulty).fill(false);
                        return (
                            <div key={"module" + i} className="relative w-full aspect-video flex flex-col justify-end gap-2 p-8">
                                <img src={modul.img} className="w-full h-full rounded-3xl inset-0 brightness-[40%] absolute -z-10"/>
                                <h2 className="text-xl font-bold">{modul.topic}</h2>
                                <p className="text-base text-wrap">{modul.text}</p>
                                <div className="flex gap-3">
                                    <div className="flex gap-2 items-center"> <QuestionsSVG/> {modul.questionsNumber} вопросов</div>
                                    <div className="flex gap-2 items-center"> <ClockSVG/> {modul.duration}</div>
                                    <div className="flex gap-2 items-center"> <UserSVG/> {modul.usersNumber} пользователей</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2 items-center">Сложность: {
                                        difficultyArray.map((e, index) => {
                                            return (
                                                <LightningSVG key={"LightningSVG" + index}/>
                                            )
                                        })
                                    }</div>
                                    <Button className={`${styles.button_success}`}>Начать</Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function LightningSVG(){
    return (
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.08336 16.75H3.16669L4.08336 10.3333H0.875023C0.343356 10.3333 0.352523 10.04 0.526689 9.72833C0.700856 9.41667 0.572523 9.655 0.590856 9.61833C1.77336 7.52833 3.55169 4.41167 5.91669 0.25H6.83336L5.91669 6.66667H9.12502C9.57419 6.66667 9.63836 6.96917 9.55585 7.13417L9.49169 7.27167C5.88002 13.5875 4.08336 16.75 4.08336 16.75Z" fill="#DADE1B"/>
        </svg>
    )
}
function QuestionsSVG(){
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.25 8.875H19.5V6.375H13.25V8.875ZM13.25 17.625H19.5V15.125H13.25V17.625ZM20.75 23.25H3.25C1.875 23.25 0.75 22.125 0.75 20.75V3.25C0.75 1.875 1.875 0.75 3.25 0.75H20.75C22.125 0.75 23.25 1.875 23.25 3.25V20.75C23.25 22.125 22.125 23.25 20.75 23.25ZM4.5 10.75H10.75V4.5H4.5V10.75ZM5.75 5.75H9.5V9.5H5.75V5.75ZM4.5 19.5H10.75V13.25H4.5V19.5ZM5.75 14.5H9.5V18.25H5.75V14.5Z" fill="#9632A6"/>
        </svg>
    )
}
function ClockSVG(){
    return (
        <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.75 0.25H8.25V2.75H15.75V0.25ZM10.75 16.5H13.25V9H10.75V16.5ZM20.7875 8.2375L22.5625 6.4625C22.025 5.825 21.4375 5.225 20.8 4.7L19.025 6.475C17.0875 4.925 14.65 4 12 4C5.7875 4 0.75 9.0375 0.75 15.25C0.75 21.4625 5.775 26.5 12 26.5C18.225 26.5 23.25 21.4625 23.25 15.25C23.25 12.6 22.325 10.1625 20.7875 8.2375ZM12 24C7.1625 24 3.25 20.0875 3.25 15.25C3.25 10.4125 7.1625 6.5 12 6.5C16.8375 6.5 20.75 10.4125 20.75 15.25C20.75 20.0875 16.8375 24 12 24Z" fill="#00FFF0" fillOpacity="0.48"/>
        </svg>
    )
}
function UserSVG(){
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM13 4.25C15.075 4.25 16.75 5.925 16.75 8C16.75 10.075 15.075 11.75 13 11.75C10.925 11.75 9.25 10.075 9.25 8C9.25 5.925 10.925 4.25 13 4.25ZM13 22C9.875 22 7.1125 20.4 5.5 17.975C5.5375 15.4875 10.5 14.125 13 14.125C15.4875 14.125 20.4625 15.4875 20.5 17.975C18.8875 20.4 16.125 22 13 22Z" fill="#91898C"/>
        </svg>
    )
}