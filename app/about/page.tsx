import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-0 to-accent-yellow-light">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <Breadcrumbs items={[{ label: "About" }]} />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
              About IELTS Hacks
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                IELTS Hacks is a comprehensive platform designed to help
                students achieve Band 9 in their IELTS examination. Whether
                you're preparing for Academic or General Training, this platform
                provides expert guidance, study materials, practice tests, and
                proven strategies to maximize your score.
              </p>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">
                Our Mission
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Our mission is to make high-quality IELTS preparation resources
                accessible to everyone. We curate the best study materials,
                compile proven strategies from experienced instructors, and
                provide a centralized platform for all your IELTS preparation
                needs.
              </p>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">
                What We Offer
              </h2>
              <ul className="list-disc list-inside text-neutral-600 mb-6 space-y-2">
                <li>
                  Comprehensive study materials including official practice
                  books and guides
                </li>
                <li>
                  Band 9 strategies for all four IELTS sections: Reading,
                  Writing, Listening, and Speaking
                </li>
                <li>Practice papers and test materials</li>
                <li>Curated external resources and links</li>
                <li>Mobile-responsive design for learning on any device</li>
              </ul>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">
                Get Started
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Start your IELTS preparation journey today by exploring our
                study materials, learning proven strategies, and utilizing our
                comprehensive resources. Everything you need to achieve Band 9
                is right here.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
