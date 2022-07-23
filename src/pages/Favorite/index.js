import React from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./favorite.module.scss";

import Cards from "../../components/Cards";
import { clearFavoriteList } from "../../redux/action";
import Layout from "../../components/Layout";

const Favorite = () => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state);

  const handleClear = () => {
    dispatch(clearFavoriteList());
  };

  return (
    <Layout title="Favorite">
      {favoriteList?.length ? (
        <>
          <Cards title="Favorite Movies" data={favoriteList} loadMore={false} />
          <div className={s.btn_wrapper}>
            <button onClick={handleClear} className={s.btn}>
              Clear
            </button>
          </div>
        </>
      ) : (
        <div className="empty_message fade_in">Favorite list is empty</div>
      )}
    </Layout>
  );
};

export default Favorite;
