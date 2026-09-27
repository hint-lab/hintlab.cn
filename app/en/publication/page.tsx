import PublicationPage from '../../components/PublicationPage';

export default function PublicationEN() {
  return (
    <PublicationPage
      locale="en"
      title="Publications"
      summary="A year-organized list of representative papers and conference output from the lab."
      homeHref="/en"
      homeLabel="Back to Home"
      emptyYearLabel="Others"
      pdfLabel="PDF"
      urlLabel="Link"
      doiLabel="DOI"
      allYearsLabel="All Years"
      filterAllLabel="All"
      filterDocLabel="Document Understanding"
      filterHciLabel="HCI"
      filterCogLabel="Collaborative Cognition"
      filterSocialLabel="Social Networks"
      emptyCategoryLabel="No publications found in this category."
    />
  );
}
