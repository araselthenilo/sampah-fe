import "../css/PageContent.css";
import BackButton from "./BackButton";

function PageContent({ title, subtitle, back_button = false, children }) {
  return (
    <main className="page-content">
      <div className="page-content__header">
        {back_button && <BackButton className="page-content__back-button" />}
        <h1 className="page-content__title">{title}</h1>
      </div>
      {subtitle && <p className="page-content__subtitle">{subtitle}</p>}
      <div className="page-content__body">{children}</div>
    </main>
  );
}

export default PageContent;
