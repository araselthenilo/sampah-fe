import "../css/PageContent.css";

function PageContent({ title, subtitle, children }) {
  return (
    <main className="page-content">
      <h1 className="page-content__title">{title}</h1>
      {subtitle && <p className="page-content__subtitle">{subtitle}</p>}
      <div className="page-content__body">{children}</div>
    </main>
  );
}

export default PageContent;
