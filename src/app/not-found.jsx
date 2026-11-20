import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Container className="text-center max-w-md">
        <p className="text-base font-semibold text-blue-600 dark:text-blue-400">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
