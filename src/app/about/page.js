import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "About Us",
  description: "Learn more about our team and mission.",
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
          About Us
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          This is an example about page. Notice how easy it is to add new pages—just write simple JSX inside a Container, and Header & Footer will automatically surround it!
        </p>
      </Container>
    </div>
  );
}