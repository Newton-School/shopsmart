export function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-logo__mark site-logo__mark--sm" aria-hidden="true" />
          <div>
            <strong className="site-footer__name">ShopSmart</strong>
            <p className="site-footer__tagline">Smart shopping, simple experience.</p>
          </div>
        </div>
        <div className="site-footer__cols">
          <div>
            <h3 className="site-footer__heading">Shop</h3>
            <ul className="site-footer__list">
              <li>
                <a href="#catalog">All products</a>
              </li>
              <li>
                <a href="#catalog">New</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="site-footer__heading">Company</h3>
            <ul className="site-footer__list">
              <li>
                <a href="#footer">About</a>
              </li>
              <li>
                <a href="#footer">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="site-footer__legal">© {new Date().getFullYear()} ShopSmart. Demo storefront.</p>
    </footer>
  );
}
