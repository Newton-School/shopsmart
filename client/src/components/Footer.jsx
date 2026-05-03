const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} ShopSmart, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
