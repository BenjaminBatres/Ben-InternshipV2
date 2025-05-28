import FooterLink from "./ui/FooterLink";

export default function Footer() {

  return (
    <div id="footer">
      <div className="container">
        <div className="row">
          <div className="footer__top--wrapper">
            <FooterLink />
          </div>
          <div className="footer__copyright--wrapper">
            <div className="footer__copyright">
                Copyright © 2023 Summarist.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
