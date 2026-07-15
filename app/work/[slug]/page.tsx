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
    };
  }

  return {
    title: `${page.title} | Sanya Malhotra`,
    description: page.meta.join(" * "),
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
