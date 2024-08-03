import Searchbar from "./Searchbar";
import { useState } from "react";
import "./SearchPage.css";
import { Button } from "react-bootstrap";
import UploadModal from "../UploadCSV/UploadModal";
import { SearchProps } from "../Types/types";

const SearchPage = (getSearch: SearchProps) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        id="searchBarContainer"
        style={{ position: "relative", height: "100vh" }}
      >
        <Button
          className="importbtn"
          variant="dark"
          id="upldBtn"
          size="lg"
          style={{
            width: "10vw",
            fontWeight: "600",
            fontSize: "1.4em",
            position: "absolute",
            top: 30,
            right: 30,
          }}
          onClick={() => setModalShow(true)}
        >
          Import
        </Button>
        <UploadModal show={modalShow} onHide={() => setModalShow(false)} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
          <Searchbar onDataReceived={getSearch.onDataReceived} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
