import React from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./favorite.module.scss";
import PageTitle from "../../components/PageTitle";

import Cards from "../../components/Cards";
import { clearFavoriteList } from "../../store/action";
import Layout from "../../components/Layout";

const Favorite = () => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state);

  const handleClear = () => {
    dispatch(clearFavoriteList());
  };

  return (
    <PageTitle title="Favorite">
      <Layout>
        {favoriteList?.length ? (
          <>
            <Cards
              title="Favorite Movies"
              data={favoriteList}
              loadMore={false}
            />
            <div className={s.btn_wrapper}>
              <button onClick={handleClear} className={s.btn}>
                Clear
              </button>
            </div>
          </>
        ) : (
          <div className={s.empty_message}>Favorite list is empty</div>
        )}
      </Layout>
    </PageTitle>
  );
};

export default Favorite;
