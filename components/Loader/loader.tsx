import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Loader() {
    const { t } = useTranslation();
    const facts = t('facts', { returnObjects: true });

    const [fact, setFact] = useState(facts[Math.floor(Math.random() * facts.length)]);

    useEffect(() => {
        const interval = setInterval(() => {
            let newFact;
            do {
                newFact = facts[Math.floor(Math.random() * facts.length)];
            } while (newFact === fact);
            setFact(newFact);
        }, 7000);

        return () => clearInterval(interval);
    }, [fact]);

    return (
        <div className="m-auto w-fit flex-col mt-32">
            <div className={"loader mx-auto"}></div>
            <p className={'text-center mt-4 text-gray-400'}>
                {/* Подсвечиваем ключевые слова */}
                {fact.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                        <span key={index} className="text-yellow-400">
                            {part.replace(/\*\*/g, '')}
                        </span>
                    ) : (
                        part
                    )
                )}
            </p>
        </div>
    );
}
