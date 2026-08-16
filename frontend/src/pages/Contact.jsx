import React from 'react';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactMap from '../components/ContactMap';
import ContactFAQ from '../components/ContactFAQ';

export default function Contact() {
    return (
        <main className="w-full">
            <ContactHero />
            <ContactForm />
            <ContactMap />
            <ContactFAQ />
        </main>
    )
}