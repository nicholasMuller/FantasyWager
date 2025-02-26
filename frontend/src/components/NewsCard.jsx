import "./NewsCard.css";

const NewsCard = ({ stories }) => {
  // console.log(stories)
  const [s1, s2, s3, s4, s5, s6] = stories;

  return (
    <>
      {s1 && (
        <div className="news-card container rounded m-3">
          <div className="row border border-3 rounded m-1">
            <div className="col-12 col-lg-6  d-flex justify-content-center align-items-middle">
              <img
                src={s1.images[0]["url"]}
                alt={s1.images[0]["caption"]}
                className="newsImage my-3 rounded w-100 h-80 "
              ></img>
            </div>
            <div className="col-12 col-lg-6  justify-content-center align-items-middle text-center">
              <h3 className="display-6 m-2 fw-bold">{s1.headline}</h3>
              <p className="lead">{s1.description}</p>
            </div>
          </div>
          <div className="row row-cols-sm-1 row-cols-lg-4 border border-3 rounded m-1">
            <div className="col col-3 text-center">
              <h6 className="fw-bold mt-2">{s2.headline}</h6>
              <img
                src={s2.images[0]["url"]}
                alt={s2.images[0]["caption"]}
                className="newsImage mb-3 w-100 h-75 rounded"
              ></img>
            </div>

            <div className="col col-3 text-center">
              <h6 className="fw-bold mt-2">{s3.headline}</h6>
              <img
                src={s3.images[0]["url"]}
                alt={s3.images[0]["caption"]}
                className="newsImage mb-3 w-100 h-75 rounded"
              ></img>
            </div>

            <div className="col col-3 text-center">
              <h6 className="fw-bold mt-2">{s4.headline}</h6>
              <img
                src={s4.images[0]["url"]}
                alt={s4.images[0]["caption"]}
                className="newsImage mb-3 w-100 h-75 rounded"
              ></img>
            </div>

            <div className="col col-3 text-center">
              <h6 className="fw-bold mt-2">{s5.headline}</h6>
              <img
                src={s5.images[0]["url"]}
                alt={s5.images[0]["caption"]}
                className="newsImage mb-3 w-100 h-75 rounded"
              ></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;
