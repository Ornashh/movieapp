import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisted = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisted();
    };
  }, [history]);

  return null;
}

export default withRouter(ScrollToTop);
