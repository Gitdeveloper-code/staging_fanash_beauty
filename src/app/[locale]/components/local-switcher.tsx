'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <label className='border-2 rounded'>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2 text-tertiary focus:outline-none'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>English</option>
        <option value='nl'>Dutch</option>
      </select>
    </label>
  );
}
