import useFetch from "./useFetch";
import { BsSearch } from "react-icons/bs";
import { FaWikipediaW } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useState } from "react";

function App() {
  const myInit = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState( 
    `https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&prop=extracts%7Cpageimages&generator=search&exchars=200&exintro=1&explaintext=1&piprop=thumbnail%7Cname&gsrsearch=${search}`
  );
  const { isLoading, isError, data } = useFetch(url, myInit);
  const handleSubmit = (event) => {
    event.preventDefault();

    const newUrl = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&prop=extracts%7Cpageimages&generator=search&exchars=200&exintro=1&explaintext=1&piprop=thumbnail%7Cname&gsrsearch=${search}`;
    setUrl(newUrl);
  };
  const random = () => {
    window.location.assign("https://en.wikipedia.org/wiki/Special:Random");
  };
  return (
    <main className={`flex flex-column ${isLoading && "flex-center"}`}>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <section className="wrapper">
          <h1 className="margin-top text-centered">
            {" "}
            <span>
              {" "}
              <FaWikipediaW className="wiki-font"></FaWikipediaW>ikipedia Search
            </span>
          </h1>
          <div className="title-underline"></div>
          <form className="form" onSubmit={(event) => handleSubmit(event)}>
            <div>
              <label htmlFor="search" className="form-label">
                Search <BsSearch></BsSearch>
              </label>
              <input
                id="search"
                type="text"
                className="form-input"
                placeholder="dragon fly"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <p className="random" onClick={() => random()}>
              Click for a random article{" "}
              <GiPerspectiveDiceSixFacesRandom></GiPerspectiveDiceSixFacesRandom>
            </p>
          </form>

          {data.query &&
            Object.values(data.query.pages).map((x) => {
              {
                var thumbnail = x.thumbnail && x.thumbnail.source;
              }
              return (
                <article key={x.pageid} className="article">
                  <a href={`https://en.wikipedia.org/?curid=${x.pageid}`}>
                    <h3>{x.title}</h3>
                    <p>{x.extract}</p>
                    <div className="container-img">
                      <img
                        className="img"
                        src={thumbnail || "./default-image.jpg"}
                        alt="aa"
                      />
                    </div>
                  </a>
                </article>
              );
            })}
        </section>
      )}
    </main>
  );
}

export default App;
