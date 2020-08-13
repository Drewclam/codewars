// You should get and parse the html of the codewars leaderboard page.

// You can use Nokogiri(Ruby) or BeautifulSoup(Python) or CheerioJS(Javascript).

// For Javascript: Return a Promise resolved with your 'Leaderboard' Object!

// You must meet the following criteria:

// Return a 'Leaderboard' object with a position property. ``` Leaderboard#position should contain 500 'User' objects. Leaderboard#position[i] should return the ith ranked User(1 based index). ```
// Each User should have the following properties:

// User#name    # => the user's username, not their real name
// User#clan    # => the user's clan, empty string if empty clan field
// User#honor   # => the user's honor points as an integer
// Ex:

//   an_alien = leaderboard.position[3]   # => #<User:0x3124da0 @name="myjinxin2015", @clan="China Changyuan", @honor=21446>
//   an_alien.name                        # => "myjinxin2015"
//   an_alien.clan                        # => "China Changyuan"
//   an_alien.honor                       # => 21446

const cheerio = require("cheerio");
const https = require("https");
const URL = "https://www.codewars.com/users/leaderboard";

async function solution() {
  let leaderboard = "";
  const leaderboardPromise = new Promise((resolve, reject) => {
    https.get(URL, (res) => {
      res.on("data", function (body) {
        leaderboard += body;
      });
      res.on("end", () => resolve(leaderboard));
    });
  });
  await leaderboardPromise;
  const $ = cheerio.load(leaderboard);
  const position = [];
  $("tr").map((index, element) => {
    if (index == 0) {
      return;
    }
    const newUser = {
      name: $(element).find("a").text(),
      clan: $(element).find("td").eq(2).text() || "",
      honor: parseInt($(element).find("td").eq(3).text().replace(",", "")),
    };
    position[index] = newUser;
  });

  return new Promise((res, rej) => res({ position }));
}
