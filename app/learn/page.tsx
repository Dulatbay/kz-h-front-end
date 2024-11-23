export default function Learn(){
    const data = [
        {   
            "id" : 1,
            "topic" : "Древний век",
            "active": true,
            "levels_cnt": 8,
            "first_active": 1
        },
        {   
            "id" : 2,
            "topic" : "Тюркский период",
            "active": false,
            "levels_cnt": 7,
            "first_active": 0
        }
    ];

    return (
        <div className="flex flex-col w-full max-w-[480px] mx-auto">
            
            {
                data.map((segment, ind) => {

                    const list = []

                    for(let i = 0; i < segment.first_active; i++){
                        list.push(true);
                    }
                    for(let i = segment.first_active; i < segment.levels_cnt; i++){
                        list.push(false);
                    }

                    return (
                        <div key={"segment" + ind}>
                            <Topic active={segment.active} topic={segment.topic} id={segment.id}/>
                            <div className="flex flex-col gap-3 py-3">
                                {
                                    list.map((isActive, index) => {
                                        let colClass;
                                        if(index % 4 == 0){
                                            colClass = 'col-start-3';
                                        }else if(index % 8 == 1 || index % 8 == 3){
                                            colClass = 'col-start-2';
                                        }else if(index % 8 == 2){
                                            colClass = 'col-start-1';
                                        }else if(index % 8 == 5 || index % 8 == 7){
                                            colClass = 'col-start-4';
                                        }else{
                                            colClass = 'col-start-5';
                                        }
                                        return (
                                            <div key={`floor${ind}${index}`} className="w-full grid grid-cols-5 pl-2 pr-8">
                                                <div className={colClass}>
                                                    <LevelButton link={`/${index + 1}`} active={isActive}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}


function LevelButton({active, link} : {active?: boolean, link: string}){

    if(active){
        return (
            <a href={`/learn${link}`} className={`py-6 px-3 text-base rounded-full pb-5 bg-[#5348F2] border-[#393393] active:border-b-0 active:mt-2 border-b-8 w-20 flex items-center justify-center `}>
                <span className="text-base">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2239 25.9933C20.0156 25.9942 19.8101 25.9426 19.6247 25.8428L12.9805 22.1909L6.33626 25.8428C6.12051 25.9619 5.87726 26.0151 5.63416 25.9963C5.39106 25.9775 5.15786 25.8874 4.96108 25.7364C4.76429 25.5854 4.61182 25.3794 4.52098 25.1419C4.43014 24.9044 4.40459 24.645 4.44722 24.393L5.75001 16.6924L0.382536 11.2214C0.215073 11.0459 0.0962775 10.8259 0.0388979 10.5849C-0.0184817 10.344 -0.0122791 10.0911 0.0568402 9.85358C0.132349 9.61049 0.271248 9.39449 0.457772 9.23009C0.644297 9.06569 0.870979 8.95948 1.1121 8.9235L8.53796 7.78824L11.808 0.771574C11.9146 0.540323 12.0812 0.345297 12.2886 0.208837C12.4959 0.0723759 12.7357 0 12.9805 0C13.2252 0 13.465 0.0723759 13.6724 0.208837C13.8797 0.345297 14.0463 0.540323 14.153 0.771574L17.462 7.77456L24.8879 8.90982C25.129 8.9458 25.3557 9.05202 25.5422 9.21641C25.7288 9.38081 25.8677 9.59681 25.9432 9.8399C26.0123 10.0774 26.0185 10.3303 25.9611 10.5712C25.9037 10.8122 25.7849 11.0322 25.6175 11.2077L20.25 16.6788L21.5528 24.3793C21.5993 24.6357 21.5749 24.9008 21.4826 25.1431C21.3903 25.3855 21.2338 25.5951 21.0317 25.7471C20.7958 25.9207 20.5117 26.0072 20.2239 25.9933Z" fill="white"/>
                    </svg>
                </span>
            </a>
        )
    }

    return (
        <button disabled className={`py-6 px-3 text-base rounded-full pb-5 bg-[#37464F] border-[#2125278f] border-b-8 w-20 flex items-center justify-center`}>
            <span className="text-base">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.2239 25.9933C20.0156 25.9942 19.8101 25.9426 19.6247 25.8428L12.9805 22.1909L6.33626 25.8428C6.12051 25.9619 5.87726 26.0151 5.63416 25.9963C5.39106 25.9775 5.15786 25.8874 4.96108 25.7364C4.76429 25.5854 4.61182 25.3794 4.52098 25.1419C4.43014 24.9044 4.40459 24.645 4.44722 24.393L5.75001 16.6924L0.382536 11.2214C0.215073 11.0459 0.0962775 10.8259 0.0388979 10.5849C-0.0184817 10.344 -0.0122791 10.0911 0.0568402 9.85358C0.132349 9.61049 0.271248 9.39449 0.457772 9.23009C0.644297 9.06569 0.870979 8.95948 1.1121 8.9235L8.53796 7.78824L11.808 0.771574C11.9146 0.540323 12.0812 0.345297 12.2886 0.208837C12.4959 0.0723759 12.7357 0 12.9805 0C13.2252 0 13.465 0.0723759 13.6724 0.208837C13.8797 0.345297 14.0463 0.540323 14.153 0.771574L17.462 7.77456L24.8879 8.90982C25.129 8.9458 25.3557 9.05202 25.5422 9.21641C25.7288 9.38081 25.8677 9.59681 25.9432 9.8399C26.0123 10.0774 26.0185 10.3303 25.9611 10.5712C25.9037 10.8122 25.7849 11.0322 25.6175 11.2077L20.25 16.6788L21.5528 24.3793C21.5993 24.6357 21.5749 24.9008 21.4826 25.1431C21.3903 25.3855 21.2338 25.5951 21.0317 25.7471C20.7958 25.9207 20.5117 26.0072 20.2239 25.9933Z" fill="white"/>
                </svg>
            </span>
        </button>
    )
}

function Topic({active, topic, id} : {active? : boolean, topic: string, id: number}){
    if(active){
        return (
            <div className="bg-[#5046E5] w-full h-24 rounded-3xl p-4 flex flex-col justify-center mt-4">
                <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF99" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>
                    <h3 className="text-[#FFFFFF99] text-sm sm:text-base">МОДУЛЬ {id}</h3>
                </div>
                <h1 className="text-xl sm:text-3xl">{topic}</h1>
            </div>
        )
    }else{
        return (
            <div className="w-full h-24 rounded-3xl text-[#91898C] p-4 flex flex-col justify-center mt-4">
                <div className="flex items-center gap-3 justify-center">
                    <svg width="61" height="1" viewBox="0 0 61 1" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="61" y2="0.5" stroke="#91898C"/></svg>
                    <h1 className="text-xl sm:text-3xl text-nowrap">{topic}</h1>
                    <svg width="61" height="1" viewBox="0 0 61 1" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="0.5" x2="61" y2="0.5" stroke="#91898C"/></svg>
                </div>
                <div className="flex items-center gap-1 justify-center w-full"><h3 className="text-[#FFFFFF99] text-sm sm:text-base">МОДУЛЬ {id}</h3></div>
            </div>
        )
    }
}