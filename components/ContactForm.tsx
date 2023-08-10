'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { submitContactFormAction, type CustomIssue } from '@/lib/actions';

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<CustomIssue[]>([]);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    async function handleSubmitAction(data: FormData) {
        setErrors([]);
        setIsSubmitting(true);
        const { success, errors, message } = await submitContactFormAction(data);

        if (success) {
            setMessage('Thanks for reaching out!\n\nI will get back to you as soon as possible.');
            setSuccess(true);

            const form = document.getElementById('contact-form') as HTMLFormElement;
            form.reset();
        }

        if (!success) {
            setErrors(errors);
            setMessage('Oops! There was an error.');
            setSuccess(true);
        }
        // Hide the error message after 7 seconds.
        setTimeout(() => {
            setMessage('');
            setSuccess(false);
        }, 5000);

        setIsSubmitting(false);
    }

    return (
        <>
            {success && (
                <div
                    className={cn(
                        'p-4 mt-4',
                        success ? 'bg-green-500 border-green-500' : 'bg-rose-500 border-rose-500'
                    )}
                >
                    <p className="text-xs">{message}</p>
                    {errors?.length > 0 && (
                        <ul className="space-y-1">
                            {errors?.map(error => (
                                <li key={error.field} className="text-xs text-white">
                                    {error.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            <form
                id="contact-form"
                action={handleSubmitAction}
                className="max-w-screen-md py-3 mx-auto  space-y-3"
            >
                <div className="flex flex-col gap-3 md:flex-row">
                    <label className="relative w-full">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            required
                            disabled={isSubmitting}
                            className={cn(
                                'w-full px-4 py-3 text-sm bg-transparent border-neutral-600 focus:ring-neutral-600 focus:border-transparent rounded',
                                'disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                        />
                    </label>
                    <label className="relative w-full">
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email*"
                            disabled={isSubmitting}
                            className={cn(
                                'w-full px-4 py-3 text-sm bg-transparent border-neutral-600 focus:ring-neutral-600 focus:border-transparent rounded',
                                'disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                        />
                    </label>
                </div>
                <label className="relative block w-full">
                    <input
                        type="text"
                        name="subject"
                        required
                        placeholder="Subject*"
                        disabled={isSubmitting}
                        className={cn(
                            'w-full px-4 py-3 text-sm bg-transparent border-neutral-600 focus:ring-neutral-600 focus:border-transparent rounded',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    />
                </label>
                <label className="relative block w-full">
                    <textarea
                        placeholder="Message*"
                        name="message"
                        minLength={10}
                        rows={5}
                        disabled={isSubmitting}
                        className={cn(
                            'w-full px-4 py-3 text-sm bg-transparent border-neutral-600 focus:ring-neutral-600 focus:border-transparent rounded',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    ></textarea>
                    <small className="block text-end text-xs text-neutral-500">
                        *Message should be at least 10 characters long
                    </small>
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 border border-zinc-700 text-sm transform rounded',
                        'hover:bg-neutral-600 hover:border-transparent hover:scale-[1.02] transition-colors duration-200 ease-in-out',
                        'focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:ring-offset-1 focus:ring-offset-transparent',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                >
                    <span>{isSubmitting ? 'Sending...' : "Let's talk"}</span>
                    {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
                </button>
            </form>
        </>
    );
}
