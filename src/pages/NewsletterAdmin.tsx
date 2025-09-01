import Header from "@/components/Header";
import NewsletterAdmin from "@/components/NewsletterAdmin";

const NewsletterAdminPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Newsletter Administration</h1>
          <NewsletterAdmin />
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdminPage;