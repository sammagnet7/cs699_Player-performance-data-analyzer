/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import Bowleroverview from "../PlayerOverview/Bowleroverview";
import Batsmanoverview from "../PlayerOverview/Batsmanoverview";
import Allroundoverview from "../PlayerOverview/Allroundoverview";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayerImage.css";
import { overview, Player } from "../Types/types";
import { CACHE_KEY, getFromLocalStorage } from "../API/api";

const Profileimage = (pl: overview) => {
  const [compareList, setCompareList] = useState<Player[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const cachedList = getFromLocalStorage(CACHE_KEY);
    if (cachedList) {
      const parsedList: Player[] = JSON.parse(cachedList);
      if (pl.player.roll_id === "BOW" || pl.player.roll_id === "BAT") {
        const filteredComparisonList = parsedList.filter(
          (item) =>
            item.fullName != pl.player.fullName &&
            (item.roll_id == pl.player.roll_id || item.roll_id === "ALL")
        );

        // console.log(filteredComparisonList);
        setCompareList(filteredComparisonList);
      } else {
        setCompareList(parsedList);
      }
    }
  }, []);
  
  const handleComparison = (item: Player) => {
    navigate("/compare", {
      state: {
        playerA: pl.player,
        playerB: item,
        careerAvgA_Bat: pl.careerAvgBat,
        careerAvgA_Bow: pl.careerAvgBowl,
      },
    });
  };
  const pdfHandler = () => {
    window.print();
  };
  return (
    <>
      <div
        className="row gx-2 flex-column flex-md-row"
        style={{ marginLeft: "5rem", marginTop: "2rem", marginRight: "5rem" }}
      >
        <div className="col col-md-2" id="image-container">
          <Card className="shadow p-3 bg-body-tertiary rounded">
            {pl.player && (
              <Card.Img
                variant="top"
                src={pl.player.photoLink || "src/assets/default.png"}
              />
            )}
            <Card.Body>
              {pl.player && (
                <Card.Title className="text-center">
                  {pl.player.fullName}
                </Card.Title>
              )}
            </Card.Body>
          </Card>
        </div>
        <div className="col col-md-10">
          {pl.careerAvgBat && pl.careerAvgBowl && (
            <Allroundoverview
              player={pl.player}
              careerAvgBat={pl.careerAvgBat}
              careerAvgBowl={pl.careerAvgBowl}
            />
          )}
          {pl.careerAvgBat && !pl.careerAvgBowl && (
            <Batsmanoverview player={pl.player} careerAvg={pl.careerAvgBat} />
          )}
          {pl.careerAvgBowl && !pl.careerAvgBat && (
            <Bowleroverview player={pl.player} careerAvg={pl.careerAvgBowl} />
          )}
          <div className="row g-2" id="button-row">
            <div className="col col-sm-2">
              <DropdownButton id="dropdown-button" title="Compare with">
                {compareList &&
                  compareList.map((item) => (
                    <Dropdown.Item
                      onClick={() => handleComparison(item)}
                      key={item.pid}
                    >
                      {item.fullName}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </div>
            <div className="col col-sm-2">
              <Button onClick={pdfHandler} variant="primary">
                Download
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileimage;
