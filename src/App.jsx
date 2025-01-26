import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import RenderedImage from "./RenderedImage/RenderedImage";
import Logo from "./Logo/Logo";
import axios from "axios";
import Pagination from "./Pagination/Pagination";
import SearchBar from "./SearchBar/SearchBar";
import Footer from "./Footer/Footer";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchInput = useRef(null);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
    setPage(1);
  };

  const toggleDarkMode = () => {
    var element = document.body;
    element.classList.toggle("darkmode");
  };

  return (
    <>
      <Logo />
      <SearchBar onSubmit={handleSubmit} searchInput={searchInput} />
      <RenderedImage images={images} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      <Footer />
      <button className="darkbtn" onClick={toggleDarkMode}>
        Toggle
      </button>
    </>
  );
}
export default App;
