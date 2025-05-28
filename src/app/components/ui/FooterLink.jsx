export default function FooterLink() {
  const footerLinks = [
    {
      title: "Actions",
      link1: "Summarist Magazine",
      link2: "Cancel Subscription",
      link3: "Help",
      link4: "Contact us",
    },
    {
      title: "Useful Links",
      link1: "Pricing",
      link2: "Summarist Bussiness",
      link3: "Gift Cards",
      link4: "Author & Publishers",
    },
    {
      title: "Company",
      link1: "About",
      link2: "Careers",
      link3: "Partners",
      link4: "Code of Conduct",
    },
    {
      title: "Other",
      link1: "Sitemap",
      link2: "Legal Notice",
      link3: "Terms of Service",
      link4: "Privacy Policies",
    },
  ];
  return (
    <>
      {footerLinks.map((footerLink) => (
        <div className="footer__block">
          <div className="footer__link--title">{footerLink.title}</div>
          <div className="footer__link--wrapper">
            <a className="footer__link">{footerLink.link1}</a>
          </div>
          <div className="footer__link--wrapper">
            <a className="footer__link">{footerLink.link2}</a>
          </div>
          <div className="footer__link--wrapper">
            <a className="footer__link">{footerLink.link3}</a>
          </div>
          <div className="footer__link--wrapper">
            <a className="footer__link">{footerLink.link4}</a>
          </div>
        </div>
      ))}
    </>
  );
}
