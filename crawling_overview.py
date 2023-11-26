from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import re
import csv

# 253802: Virat Kohli (BAT)
# 34102: Rohit Gurunath Sharma (BAT)
# 422108: Kannaur Lokesh Rahul (BAT)
# 234675: Ravindrasinh Anirudhsinh Jadeja (ALL)
# 625371: Hardik Himanshu Pandya (ALL)
# 625383: Jasprit Jasbirsingh Bumrah (BOW)
# 481896: Mohammed Shami Ahmed (BOW)
# 26421: Ravichandran Ashwin (BOW)

urls = {
    253802: "https://www.espncricinfo.com/cricketers/virat-kohli-253802",
    34102: "https://www.espncricinfo.com/cricketers/rohit-sharma-34102",
    422108: "https://www.espncricinfo.com/cricketers/kl-rahul-422108",
    234675: "https://www.espncricinfo.com/cricketers/ravindra-jadeja-234675",
    625371: "https://www.espncricinfo.com/cricketers/hardik-pandya-625371",
    481896: "https://www.espncricinfo.com/cricketers/mohammed-shami-481896",
    26421: "https://www.espncricinfo.com/cricketers/ravichandran-ashwin-26421",
    625383: "https://www.espncricinfo.com/cricketers/jasprit-bumrah-625383",
}

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.set_preference("dom.disable_beforeunload", True)

driver_service = Service("/usr/local/bin/geckodriver")

driver = webdriver.Firefox(options=options, service=driver_service)
xpath = (
    "/html/body/div/section/section/div[5]/div[1]/div[2]/div[2]/div[2]/div/div/div[1]"
)
overview = []
csv_file = "overview.csv"
for pid in urls.keys():
    profile = {
        "p_id": "",
        "full name": "",
        "born": "",
        "age": "",
        "batting style": "",
        "bowling style": "",
        "fielding position": "",
        "playing role": "",
        "key role": "",
    }
    driver.get(urls[pid])
    try:
        parent_div = driver.find_element(By.XPATH, value=xpath)
        child_divs = parent_div.find_elements(By.CSS_SELECTOR, "div")
        profile["p_id"] = pid
        for div_index in range(6):
            p_text = (
                child_divs[div_index].find_element(By.CSS_SELECTOR, "p").text.lower()
            )
            span_text = child_divs[div_index].find_element(By.CSS_SELECTOR, "span").text
            profile[p_text] = span_text
            if re.findall(r"batter", span_text, re.IGNORECASE):
                profile["key role"] = "BAT"
            elif re.findall(r"allrounder", span_text, re.IGNORECASE):
                profile["key role"] = "ALL"
            elif re.findall(r"bowler", span_text, re.IGNORECASE):
                profile["key role"] = "BOW"
        overview.append(profile)
        # print(profile)
    except NoSuchElementException:
        continue

driver.close()

with open(csv_file, "w", newline="") as csvfile:
    fieldnames = overview[0].keys()
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    # Write the header row
    writer.writeheader()

    # Write the data rows
    for row in overview:
        writer.writerow(row)
