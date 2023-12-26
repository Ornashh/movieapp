export const Footer = () => {
  return (
    <div className="text-sm text-secondary-foreground flex flex-col gap-y-2">
      <div>
        Build on{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="text-foreground hover:underline max-md:underline"
        >
          Next.js
        </a>
      </div>
      <div>
        Data provided by{" "}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          className="text-foreground hover:underline max-md:underline"
        >
          TMDB
        </a>
      </div>
      <div>
        Source code on{" "}
        <a
          href="https://github.com/Ornashh/movieapp"
          target="_blank"
          className="text-foreground hover:underline max-md:underline"
        >
          Github
        </a>
      </div>
      <div>2023</div>
    </div>
  );
};
