import React from 'react';
import Image from "next/image"
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LocalSwitcher() {
    const router = useRouter();
    const localeActive = useLocale();

    const onLanguageChange = (locale: string) => {
        router.push(`/${locale}`);
    };

    return (
        <div className="flex text-white font-mono w-fit">
            <style jsx>{`
        button {
          transition: background-color 0.3s ease;
          cursor: pointer;
          padding: 0.4rem 1rem;
          border: 1px solid #bfa75d;
          border-radius: 0.5rem;
          margin-right: 0.5rem;
        }

        button:hover {
          background-color: #333; /* Change to desired hover color */
        }

        .text-color-en {
          color: ${localeActive === 'en' ? '#bfa75d' : 'inherit'};
        }

        .text-color-nl {
          color: ${localeActive === 'nl' ? '#bfa75d' : 'inherit'};
        }

        .icon {
          margin-right: 0.5rem;
          color: white;
        }
      `}</style>
            <button
                onClick={() => onLanguageChange(localeActive === 'en' ? 'nl' : 'en')}
                className={`rounded bg-transparent ${localeActive === 'en' ? 'text-color-en' : 'text-color-nl'
                    } flex items-center justify-center `}
            >
                <span className="icon material-icons">
                    {localeActive === 'en' ? 
                    <Image src="/asset/img/english.png" width={30} height={30} alt="fanash"></Image>
                    : <Image src="/asset/img/dutch.png" width={30} height={30} alt="fanash"></Image> }
                </span>
                {localeActive === 'en' ? 'en' : 'nl'}
            </button>
        </div>
    );
}
