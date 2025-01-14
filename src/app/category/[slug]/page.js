//src/app/category/[slug]/page.js
import Header from "../../components/Header";
import ProjectsList from "../../components/ProjectsList";
import { fetchCategoryBySlug, fetchProjects } from "../../lib/graphql";


export default async function CategoryPage({ params, searchParams }) {
  const { slug } = params; // Hämta slugen för kategorin
  const searchTerm = searchParams?.search || ""; // Hämta sökparametern från URL eller sätt till tom sträng om ingen finns.

  // Hämta kategori och projekt
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return <div>Category not found. Please check the slug or contact support.</div>;
  }

  const allProjects = await fetchProjects(); // Hämta alla projekt

  // Filtrera projekten baserat på den hämtade kategorins slug
  const filteredProjects = allProjects.filter((project) =>
    project?.categoryCollection?.items?.some(
      (cat) => cat.slug === category.slug
    )
  );

  // Om en sökterm finns, filtrera projekten baserat på sökordet i projektets titel eller beskrivning
  const searchedProjects = filteredProjects.filter((project) => {
    const titleMatch = project.projectTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = project.shortDescription
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch; // Matchar både titel och beskrivning
  });

  // Använd kategoridata för headern
  const title = category?.title || "Category";
  const backgroundImage = category?.backgroundImage?.url || "/default-image.jpg";

  return (
    <div>
      <Header
        title={title}
        slogan={`Projects under category: ${category.title}`}
        backgroundImage={backgroundImage}
        logo="/default-logo.png"
      />
      {/* Använd den globala sökbaren här */}
      <ProjectsList projects={searchedProjects} />
    </div>
  );
}
