import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState, useContext } from "react";
import "./Searchbar.css";
import { PlayerContext } from "../../App";
import { API_BASE, API_URL_OVERVIEW, CACHE_KEY } from "../API/api";
import { Player, SearchProps } from "../Types/types";

async function fetchSuggestionsFromAPI() {
  try {
    const response = await fetch(API_BASE + API_URL_OVERVIEW);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch suggestions from the API");
  }
}



function saveToLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}
function Searchbar(setSearch: SearchProps) {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [, setSelectedSuggestion] = useState<Player>();
  const [predefinedSuggestions, setPredefinedSuggestions] = useState<Player[]>(
    []
  );
  const [validated, setValidated] = useState(false);
  const [valid, setValid] = useState(true);

  const context = useContext(PlayerContext);

  useEffect(() => {
    fetchSuggestionsFromAPI()
      .then((apiData) => {
        // Store the data from the API in predefinedSuggestions
        setPredefinedSuggestions(apiData);

        // Cache the data in local storage
        saveToLocalStorage(CACHE_KEY, JSON.stringify(apiData));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(false);
    const input = e.target.value;
    setQuery(input);

    // Filter suggestions based on the input
    const filteredSuggestions = predefinedSuggestions.filter((item) =>
      item.fullName.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: Player) => {
    setSelectedSuggestion(suggestion);
    setQuery(suggestion.fullName);
    setSuggestions([]);
    context?.setPlayer(suggestion);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // check if empty form
    if (e.currentTarget.checkValidity() === false) {
      setValidated(true);
      setValid(false);
      return;
    }
    // check if entered player name belongs to existing player list
    const player = predefinedSuggestions.filter(
      (item) => item.fullName.toLowerCase() === query.toLowerCase()
    );
    // if entered player name is not in the existing
    if (player.length == 0) {
      setValidated(true);
      setValid(false);
      setSuggestions([]);
    }
    // once form submitted remove suggestions and return data to parent
    else {
      setSelectedSuggestion(player[0]);
      setSuggestions([]);
      context?.setPlayer(player[0]);
      setSearch.onDataReceived();
    }
  };

  return (
    <>
      <h1 id="hero-text" className="display-4 fw-medium text-center mb-3">
        Player Performance <br />
        Visualiser
      </h1>
      <Form
        id="searchbar"
        className="mx-auto"
        onSubmit={handleSubmit}
        noValidate
      >
        <InputGroup size="lg" hasValidation>
          <Form.Control
            className={validated && !valid ? "is-invalid" : ""}
            placeholder="Enter Player Name"
            aria-label="Enter Player Name"
            value={query}
            onChange={handleInputChange}
            required
          />
          <Button variant="primary" id="searchBtn" type="submit">
            Search
          </Button>
          <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
            Please enter a valid player name.
          </Form.Control.Feedback>
        </InputGroup>
      </Form>

      {query && (
        <ul id="suggestionList" className="list-group">
          {suggestions.map((suggestion) => (
            <li
              className="list-group-item card mb-1"
              key={suggestion.pid}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="row g-0">
                <div className="col col-md-2">
                  <img
                    src={suggestion.photoLink}
                    className="p-icon img-fluid my-auto"
                    alt="..."
                  />
                </div>
                <div className="col col-md-10">
                  <div className="card-body">
                    <h5 className="card-title"> {suggestion.fullName}</h5>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Searchbar;
