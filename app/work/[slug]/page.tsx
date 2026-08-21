import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "../../../components/case-study/CaseStudyPage";
import { caseStudyPages, getCaseStudyPage } from "../../../data/caseStudyPages";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudyPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCaseStudyPage(slug);

  if (!page) {
    return {
      title: "Case Study | Sanya Malhotra",
      description:
        "Explore product design case studies by Sanya Malhotra across UX, visual systems, and interface design.",
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: `/work/${page.slug}`,
    },
    openGraph: {
      title: page.seo.ogTitle,
      description: page.seo.ogDescription,
      url: `/work/${page.slug}`,
      images: [
        {
          url: page.seo.image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.ogTitle,
      description: page.seo.ogDescription,
      images: [page.seo.image],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const page = getCaseStudyPage(slug);

  if (!page) {
    notFound();
  }

  return <CaseStudyPage page={page} />;
}
