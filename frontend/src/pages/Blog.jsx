import React from 'react';
import BlogHero from '../components/BlogHero';
import BlogList from '../components/BlogList';
import Newsletter from '../components/Newsletter';

export default function Blog() {
    return (
        <main className="w-full">
            <BlogHero />
            <BlogList />
            <Newsletter />
        </main>
    )
}