import { NextSeo } from 'next-seo';

import PageHeader from '@/components/utils/PageHeader';
import Container from '@/components/layout/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import ResourceCard from '@/components/resources/ResourceCard';

export default function ResourcesPage() {
  const url = 'https://sergiobarria.com/resources';
  const title = 'Resources | Sergio Barria';
  const description =
    'Sergio Barria engineer, developer, writer. Sharing my journey as I transition from Civil Engineer to Web Developer';
  const pageHeaderData = {
    title: 'Useful Resources for Web Design and Development',
    subtitle: 'All Resources',
    text: `In this section I'm going to upload different code snippets, tips
    and helpful resources related to web development in
    general.`,
  };

  const categories = [
    'HTML - CSS',
    // 'JavaScript',
    'Web Design',
    // 'Web Development',
  ];

  const resourcesData = [
    {
      id: 1,
      title: 'HTML Reference by MDM',
      description:
        'MDN is one of the most used sites as reference when writing HTML & CSS',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
      category: 'HTML - CSS',
    },
    {
      id: 2,
      title: 'CSS Reference by MDN',
      description:
        'MDN is one of the most used sites as reference when writing HTML & CSS',
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference',
      category: 'HTML - CSS',
    },
    {
      id: 3,
      title: 'Tint and Shade Generator',
      description:
        'Simple tint and shade generator for a better and more beautiful design.',
      link: 'https://maketintsandshades.com/',
      category: 'Web Design',
    },
    {
      id: 4,
      title: 'Coolors',
      description:
        'Powerful tool to check contrast, create color palettes and much more.',
      link: 'https://coolors.co/',
      category: 'Web Design',
    },
    {
      id: 5,
      title: 'Tailwind Colors',
      description:
        'Beautiful color palette create for Tailwind CSS. A great starting resource for choosing your project colors',
      link: 'https://tailwindcss.com/docs/customizing-colors',
      category: 'Web Design',
    },
    {
      id: 6,
      title: 'Favicon Generator',
      description:
        'Easy to use tool to create different size favicons for your projects.',
      link: 'https://favicon.io/',
      category: 'Web Design',
    },
  ];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ url, title, description }}
      />
      <Container>
        <PageHeader {...pageHeaderData} />

        <section className="mx-4 xl:mx-0">
          <div>
            {categories.map((cat, index) => (
              <div key={index}>
                <SectionTitle title={cat} />
                <div className="grid grid-cols-12 gap-4 my-6 mb-6 md:mb-12 sm:gap-4">
                  {resourcesData
                    .filter(resource => resource.category === cat)
                    .sort((a, b) => (a.title < b.title ? -1 : 1))
                    .map(resource => (
                      <ResourceCard key={resource.id} {...resource} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
